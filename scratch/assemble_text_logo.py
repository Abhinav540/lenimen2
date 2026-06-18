def generate_clean_logo():
    # Read logo-mark.svg
    with open('public/assets/logo-mark.svg', 'r') as f:
        logo_mark_content = f.read()
        
    mark_lines = logo_mark_content.strip().split('\n')
    mark_children = mark_lines[1:-1] # skip <svg...> and </svg>
    mark_children_str = '\n'.join(mark_children)
    
    # Create the new clean logo.svg using native high-quality text elements
    svg = []
    svg.append('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 265 84" width="100%" height="100%">')
    svg.append('  <defs>')
    svg.append('    <style>')
    svg.append('      @import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,800;1,900&amp;display=swap");')
    svg.append('      .brand-title {')
    svg.append('        font-family: "Montserrat", sans-serif;')
    svg.append('        font-weight: 900;')
    svg.append('        font-style: italic;')
    svg.append('        fill: #0e4e9e;')
    svg.append('        font-size: 32px;')
    svg.append('        letter-spacing: -0.5px;')
    svg.append('      }')
    svg.append('      .brand-subtitle {')
    svg.append('        font-family: "Montserrat", sans-serif;')
    svg.append('        font-weight: 800;')
    svg.append('        font-style: italic;')
    svg.append('        fill: #0e4e9e;')
    svg.append('        font-size: 15.5px;')
    svg.append('        letter-spacing: 2px;')
    svg.append('      }')
    svg.append('    </style>')
    svg.append('  </defs>')
    svg.append('  <!-- Logo Mark on the left (scaled and translated) -->')
    svg.append('  <g transform="translate(12, 13) scale(0.082)">')
    svg.append(mark_children_str)
    svg.append('  </g>')
    svg.append('  <!-- Typography on the right (rendered using clean native font) -->')
    svg.append('  <text x="76" y="46" class="brand-title">LENIMEN</text>')
    svg.append('  <text x="76" y="66" class="brand-subtitle">BIOTECH</text>')
    svg.append('</svg>')
    
    with open('public/assets/logo.svg', 'w') as f:
        f.write('\n'.join(svg))
    print("Regenerated public/assets/logo.svg with premium typography")

if __name__ == '__main__':
    generate_clean_logo()
