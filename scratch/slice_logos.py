import os
import numpy as np
from PIL import Image

def slice_logo_strip_exact():
    img_path = 'public/assets/product-strip.png'
    if not os.path.exists(img_path):
        print(f"Error: {img_path} does not exist.")
        return

    # Load as RGB to get clean colors
    img = Image.open(img_path).convert('RGB')
    h, w, c = img.height, img.width, 3

    # Exact boundary columns for the 8 logos in product-strip.png
    columns = [
        (10, 250),    # Parinex
        (250, 485),   # Rosulen
        (485, 720),   # Telimen
        (720, 955),   # LUKA-LC
        (955, 1190),  # NIC
        (1190, 1425), # Pantolen 40mg
        (1425, 1660), # Pantolen IV 40mg
        (1660, 1905)  # Pantolen-D
    ]

    out_names = [
        "strip-parinex.png",
        "strip-rosulen.png",
        "strip-telimen.png",
        "strip-luka-lc.png",
        "strip-nic.png",
        "strip-pantolen-40.png",
        "strip-pantolen-iv.png",
        "strip-pantolen-d.png"
    ]

    out_dir = 'public/assets'
    os.makedirs(out_dir, exist_ok=True)

    for idx, (x_start, x_end) in enumerate(columns):
        sub = img.crop((x_start, 0, x_end, h))
        sub_arr = np.array(sub)
        
        # Bounding box of content (non-white pixels)
        # Background is white (255, 255, 255)
        non_white = (sub_arr[:, :, 0] < 252) | (sub_arr[:, :, 1] < 252) | (sub_arr[:, :, 2] < 252)
        active_rows = np.where(non_white.any(axis=1))[0]
        active_cols = np.where(non_white.any(axis=0))[0]
        
        if len(active_rows) == 0 or len(active_cols) == 0:
            print(f"Empty zone: {idx}")
            continue
            
        y_min, y_max = active_rows[0], active_rows[-1]
        x_min, x_max = active_cols[0], active_cols[-1]
        
        # Add 6px padding
        y_min = max(0, y_min - 6)
        y_max = min(h, y_max + 6)
        x_min = max(0, x_min - 6)
        x_max = min(sub.width, x_max + 6)
        
        trimmed = sub.crop((x_min, y_min, x_max, y_max))
        trimmed_arr = np.array(trimmed)
        
        h_t, w_t = trimmed.height, trimmed.width
        rgba_arr = np.zeros((h_t, w_t, 4), dtype=np.uint8)
        rgba_arr[:, :, :3] = trimmed_arr
        
        # Smooth transparency
        for y in range(h_t):
            for x in range(w_t):
                r, g, b = map(int, trimmed_arr[y, x])
                diff = 255 - (r + g + b) // 3
                if diff < 10:
                    alpha = 0
                elif diff > 30:
                    alpha = 255
                else:
                    alpha = int((diff - 10) / 20 * 255)
                rgba_arr[y, x, 3] = alpha
                
        out_img = Image.fromarray(rgba_arr, 'RGBA')
        out_path = os.path.join(out_dir, out_names[idx])
        out_img.save(out_path, 'PNG')
        print(f"Saved: {out_names[idx]} ({out_img.size[0]}x{out_img.size[1]})")

if __name__ == "__main__":
    slice_logo_strip_exact()
