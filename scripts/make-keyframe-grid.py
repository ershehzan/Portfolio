import cv2
import os
import glob
import numpy as np

art_dir = r'C:/Users/ershe/.gemini/antigravity/brain/b58e3653-aa6a-4f16-9d8c-3455f0be56f0/theme_qa'
ref_path = r'C:/Users/ershe/.gemini/antigravity/brain/b58e3653-aa6a-4f16-9d8c-3455f0be56f0/.user_uploaded/media_1794373744707_2e84bb77.mp4'
cur_frames = sorted(glob.glob(r'C:/Portfolio/scratch/recordings/light_to_dark_desktop/*.png'))

cap_ref = cv2.VideoCapture(ref_path)

# 4 stages to compare:
# Stage 1: Initial Appearance & Walking (Ref ~F230, Cur ~F08)
# Stage 2: Jump Arc above Portal (Ref ~F242, Cur ~F18)
# Stage 3: Subterranean Dive & Front-Lip Occlusion (Ref ~F248, Cur ~F23)
# Stage 4: Submersion & Emergence (Ref ~F260, Cur ~F30)

stages = [
    ('1. WALKING STRIDE', 230, 8),
    ('2. JUMP ARC OVER PORTAL', 242, 18),
    ('3. 3D DIVE & FRONT LIP OCCLUSION', 248, 23),
    ('4. PORTAL EMERGENCE & THEME SWAP', 260, 30),
]

row_w, row_h = 760, 160
total_h = len(stages) * (row_h + 30) + 50
canvas = np.zeros((total_h, row_w, 3), dtype=np.uint8)
canvas[:] = (12, 15, 13)

# Title
cv2.putText(canvas, 'THEME ANIMATION REPRODUCTION: STAGE-BY-STAGE AUDIT', (30, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.65, (255, 255, 255), 2)

for i, (stage_name, ref_f, cur_f) in enumerate(stages):
    y_offset = 50 + i * (row_h + 30)
    
    # Section header
    cv2.putText(canvas, stage_name, (30, y_offset + 18), cv2.FONT_HERSHEY_SIMPLEX, 0.48, (106, 243, 197), 1)

    # Reference crop
    cap_ref.set(cv2.CAP_PROP_POS_FRAMES, ref_f)
    _, f_ref = cap_ref.read()
    crop_ref = cv2.resize(f_ref[135:295, 465:805], (340, 130))
    cv2.putText(crop_ref, 'REFERENCE (Nov 8)', (10, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.42, (200, 200, 200), 1)

    # Current reproduction crop
    cur_idx = min(cur_f, len(cur_frames)-1)
    f_cur = cv2.imread(cur_frames[cur_idx])
    crop_cur = cv2.resize(f_cur[20:190, 890:1250], (340, 130))
    cv2.putText(crop_cur, 'REPRODUCTION', (10, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.42, (106, 243, 197), 1)

    canvas[y_offset + 25:y_offset + 155, 30:370] = crop_ref
    canvas[y_offset + 25:y_offset + 155, 390:730] = crop_cur

cap_ref.release()
out_img = os.path.join(art_dir, '11_side_by_side_keyframe_grid.png')
cv2.imwrite(out_img, canvas)
print('Keyframe grid written:', out_img)

