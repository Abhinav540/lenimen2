import numpy as np
from PIL import Image
from scipy.ndimage import label
import os

def rdp(points, epsilon):
    if len(points) < 3:
        return points
    
    dmax = 0
    index = 0
    end = len(points) - 1
    
    x1, y1 = points[0]
    x2, y2 = points[end]
    
    dx = x2 - x1
    dy = y2 - y1
    denom = np.sqrt(dx*dx + dy*dy)
    
    for i in range(1, end):
        x, y = points[i]
        if denom == 0:
            d = np.sqrt((x-x1)**2 + (y-y1)**2)
        else:
            d = abs(dy*x - dx*y + x2*y1 - y2*x1) / denom
        if d > dmax:
            index = i
            dmax = d
            
    if dmax > epsilon:
        results1 = rdp(points[:index+1], epsilon)
        results2 = rdp(points[index:], epsilon)
        return results1[:-1] + results2
    else:
        return [points[0], points[end]]

def moore_neighbor_trace(mask):
    h, w = mask.shape
    start_y, start_x = None, None
    for y in range(h):
        for x in range(w):
            if mask[y, x]:
                start_y, start_x = y, x
                break
        if start_y is not None:
            break
    if start_y is None:
        return []
    
    dy = [-1, -1, 0, 1, 1, 1, 0, -1]
    dx = [0, 1, 1, 1, 0, -1, -1, -1]
    
    boundary = []
    curr_y, curr_x = start_y, start_x
    boundary.append((curr_x, curr_y))
    
    back_dir = 6
    max_steps = h * w * 2
    steps = 0
    
    while steps < max_steps:
        steps += 1
        found = False
        for i in range(8):
            d = (back_dir + 1 + i) % 8
            ny, nx = curr_y + dy[d], curr_x + dx[d]
            if 0 <= ny < h and 0 <= nx < w and mask[ny, nx]:
                curr_y, curr_x = ny, nx
                boundary.append((curr_x, curr_y))
                back_dir = (d + 4) % 8
                found = True
                break
        
        if not found:
            break
            
        if curr_y == start_y and curr_x == start_x:
            break
            
    return boundary

def get_svg_path(points):
    if not points:
        return ""
    # Render coordinates with 2 decimal places for sub-pixel accuracy
    path_str = f"M {points[0][0]:.2f} {points[0][1]:.2f}"
    for p in points[1:]:
        path_str += f" L {p[0]:.2f} {p[1]:.2f}"
    path_str += " Z"
    return path_str

def main():
    # Load original image
    img = Image.open('public/assets/logo.png').convert('RGB')
    w_orig, h_orig = img.size
    
    # 1. Separate the text part (X >= 72)
    # We will crop the text part first
    text_crop = img.crop((72, 0, w_orig, h_orig))
    
    # 2. Upscale the text crop by 10x using Lanczos (high-quality interpolation)
    scale = 10
    text_upscaled = text_crop.resize((text_crop.width * scale, text_crop.height * scale), Image.Resampling.LANCZOS)
    
    # Convert upscaled image to numpy
    arr_up = np.array(text_upscaled)
    h_up, w_up, _ = arr_up.shape
    
    # Blue mask in upscaled space
    # The text is blue. Let's make the color threshold robust.
    blue_mask_up = (arr_up[:, :, 0] < 80) & (arr_up[:, :, 1] < 120) & (arr_up[:, :, 2] > 100)
    
    # Find connected components in upscaled space
    labeled_up, num_comp = label(blue_mask_up)
    print(f"Found {num_comp} letter components in upscaled space.")
    
    text_paths = []
    
    for i in range(1, num_comp + 1):
        comp = (labeled_up == i)
        # Trace boundary in 10x space
        boundary_up = moore_neighbor_trace(comp)
        if len(boundary_up) > 20: # noise filter (10x space means 10x longer boundary)
            # Downscale coordinates back to original scale (with sub-pixel precision!)
            boundary_down = [(x / float(scale) + 72.0, y / float(scale)) for x, y in boundary_up]
            
            # Apply RDP simplification on the downscaled sub-pixel coordinates.
            # Since the coordinates have fractional precision, RDP can simplify the path
            # to smooth lines without pixel wiggles!
            # Let's use epsilon = 0.15 for high fidelity and smooth lines.
            simplified = rdp(boundary_down, 0.18)
            
            path_d = get_svg_path(simplified)
            text_paths.append(path_d)
            
    print(f"Kept {len(text_paths)} letter components after filtering.")
    
    # Read logo-mark.svg
    with open('public/assets/logo-mark.svg', 'r') as f:
        logo_mark_content = f.read()
    mark_lines = logo_mark_content.strip().split('\n')
    mark_children = mark_lines[1:-1]
    mark_children_str = '\n'.join(mark_children)
    
    # Assemble the final logo.svg
    svg = []
    svg.append('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 265 84" width="100%" height="100%">')
    svg.append('  <!-- Logo Mark on the left (scaled and translated) -->')
    svg.append('  <g transform="translate(12, 13) scale(0.082)">')
    svg.append(mark_children_str)
    svg.append('  </g>')
    svg.append('  <!-- Typography on the right (high-resolution sub-pixel vector trace) -->')
    for path_d in text_paths:
        svg.append(f'  <path d="{path_d}" fill="#0e4e9e" />')
    svg.append('</svg>')
    
    with open('public/assets/logo.svg', 'w') as f:
        f.write('\n'.join(svg))
    print("Regenerated public/assets/logo.svg with smooth, authentic custom typography!")

if __name__ == '__main__':
    main()
