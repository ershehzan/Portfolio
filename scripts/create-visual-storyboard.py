import cv2
import os
import glob
import numpy as np

art_dir = r'C:/Users/ershe/.gemini/antigravity/brain/b58e3653-aa6a-4f16-9d8c-3455f0be56f0/theme_qa'
os.makedirs(art_dir, exist_ok=True)

ref_path = r'C:/Users/ershe/.gemini/antigravity/brain/b58e3653-aa6a-4f16-9d8c-3455f0be56f0/.user_uploaded/media_1794373744707_2e84bb77.mp4'
cap_ref = cv2.VideoCapture(ref_path)

# Extract key reference frames of the compact 208x50 pill:
# In 1280x720 reference video, the compact pill is at:
# y: 202..252, x: 526..734 (50h x 208w)

storyboard_steps = [
    {
        'title': 'STAGE 1: IDLE / APPEARANCE',
        'ref_frame': 220,
        'desc': 'Compact 208x50 pill: Moon on left (x=16), portal on right (x=182), no stickman yet',
    },
    {
        'title': 'STAGE 2: STICKMAN APPEARS NEAR CENTER',
        'ref_frame': 420,
        'desc': 'Tiny white stickman (h=26px) appears near center (x=116), faces right',
    },
    {
        'title': 'STAGE 3: SHORT JUMP & 3D DIVE',
        'ref_frame': 455,
        'desc': 'Stickman takes short stride, leaps and dives head-first down into right portal (x=172)',
    },
    {
        'title': 'STAGE 4: SUBMERGED & THEME SWAP',
        'ref_frame': 480,
        'desc': 'Stickman submerged in 3D black void. Website theme changes while character is inside.',
    },
    {
        'title': 'STAGE 5: EMERGENCE & ICON TRANSFORM',
        'ref_frame': 510,
        'desc': 'Stickman emerges naturally. Moon morphs to Sun on left. Capsule shifts to Light palette.',
    },
    {
        'title': 'STAGE 6: SETTLE & CLOSE',
        'ref_frame': 555,
        'desc': 'Movement finishes, Sun icon active on left, portal active on right. Capsule closes smoothly.',
    }
]

# Create a clear visual storyboard graphic
canvas_w = 900
row_h = 110
total_h = 70 + len(storyboard_steps) * row_h
canvas = np.zeros((total_h, canvas_w, 3), dtype=np.uint8)
canvas[:] = (14, 17, 15)

# Title Header
cv2.putText(canvas, 'THEME ANIMATION VISUAL STORYBOARD: REFERENCE BREAKDOWN', (25, 32), cv2.FONT_HERSHEY_SIMPLEX, 0.65, (255, 255, 255), 2)
cv2.putText(canvas, 'Exact 1:1 Analysis from November 8 Reference Video (208x50px Compact Pill)', (25, 55), cv2.FONT_HERSHEY_SIMPLEX, 0.45, (160, 160, 160), 1)

for i, step in enumerate(storyboard_steps):
    y_start = 70 + i * row_h
    
    # Dividing line
    cv2.line(canvas, (25, y_start), (canvas_w - 25, y_start), (35, 45, 38), 1)
    
    # Step title and description
    cv2.putText(canvas, step['title'], (25, y_start + 28), cv2.FONT_HERSHEY_SIMPLEX, 0.52, (106, 243, 197), 1)
    cv2.putText(canvas, step['desc'], (25, y_start + 52), cv2.FONT_HERSHEY_SIMPLEX, 0.38, (200, 200, 200), 1)
    cv2.putText(canvas, f"Ref Frame: #{step['ref_frame']} (t={step['ref_frame']/60:.2f}s)", (25, y_start + 72), cv2.FONT_HERSHEY_SIMPLEX, 0.36, (140, 140, 140), 1)

    # Reference image crop
    cap_ref.set(cv2.CAP_PROP_POS_FRAMES, step['ref_frame'])
    ret, frame = cap_ref.read()
    if ret:
        crop = frame[202:252, 526:734] # 50x208
        # Resize slightly for crisp presentation (e.g. 260x65)
        crop_disp = cv2.resize(crop, (260, 62), interpolation=cv2.INTER_NEAREST)
        
        # Draw border around sample
        cv2.rectangle(crop_disp, (0, 0), (259, 61), (60, 80, 68), 1)
        
        # Place in canvas at right side
        canvas[y_start + 20:y_start + 20 + 62, canvas_w - 285:canvas_w - 25] = crop_disp

cap_ref.release()

out_path = os.path.join(art_dir, '00_reference_storyboard_audit.png')
cv2.imwrite(out_path, canvas)
print('Visual storyboard generated:', out_path)

