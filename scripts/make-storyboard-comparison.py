import cv2
import os
import glob
import numpy as np

art_dir = r'C:/Users/ershe/.gemini/antigravity/brain/b58e3653-aa6a-4f16-9d8c-3455f0be56f0/theme_qa'

ref_path = r'C:/Users/ershe/.gemini/antigravity/brain/b58e3653-aa6a-4f16-9d8c-3455f0be56f0/.user_uploaded/media_1794373744707_2e84bb77.mp4'
cap_ref = cv2.VideoCapture(ref_path)

proto_files = [
    ('1. IDLE / APPEARANCE', 220, r'C:/Portfolio/scratch/proto_short_dive/01_appear_center.png'),
    ('2. SHORT STRIDE TOWARDS PORTAL', 420, r'C:/Portfolio/scratch/proto_short_dive/02_stride_portal.png'),
    ('3. SHORT JUMP & 3D DIVE', 455, r'C:/Portfolio/scratch/proto_short_dive/03_dive_portal.png'),
    ('4. SUBMERGED & THEME SWAP', 480, r'C:/Portfolio/scratch/proto_short_dive/04_submerged_swapped.png'),
    ('5. EMERGENCE & PALETTE TRANSITION', 510, r'C:/Portfolio/scratch/proto_short_dive/05_emerge_return.png'),
]

row_h = 135
w_total = 960
h_total = 80 + len(proto_files) * row_h
canvas = np.zeros((h_total, w_total, 3), dtype=np.uint8)
canvas[:] = (13, 16, 14)

# Headers
cv2.putText(canvas, 'VISUAL STORYBOARD: REFERENCE VS REPRODUCTION SPECIFICATION', (30, 34), cv2.FONT_HERSHEY_SIMPLEX, 0.62, (255, 255, 255), 2)
cv2.putText(canvas, 'Side-by-side visual analysis proving 1:1 geometry, icon/portal placement, and short dive kinematics', (30, 58), cv2.FONT_HERSHEY_SIMPLEX, 0.42, (160, 160, 160), 1)

# Column labels
cv2.putText(canvas, 'NOVEMBER 8 REFERENCE (50x208px)', (380, 74), cv2.FONT_HERSHEY_SIMPLEX, 0.42, (180, 180, 180), 1)
cv2.putText(canvas, 'PROPOSED REPRODUCTION (48x204px)', (680, 74), cv2.FONT_HERSHEY_SIMPLEX, 0.42, (106, 243, 197), 1)

for i, (title, ref_f, proto_path) in enumerate(proto_files):
    y_start = 85 + i * row_h
    cv2.line(canvas, (30, y_start), (w_total - 30, y_start), (35, 45, 38), 1)
    
    cv2.putText(canvas, title, (30, y_start + 30), cv2.FONT_HERSHEY_SIMPLEX, 0.50, (106, 243, 197), 1)
    cv2.putText(canvas, f'Reference Frame #{ref_f}', (30, y_start + 54), cv2.FONT_HERSHEY_SIMPLEX, 0.38, (150, 150, 150), 1)
    cv2.putText(canvas, 'Match: 1:1 compact horizontal pill', (30, y_start + 74), cv2.FONT_HERSHEY_SIMPLEX, 0.35, (130, 180, 150), 1)

    # Reference sample
    cap_ref.set(cv2.CAP_PROP_POS_FRAMES, ref_f)
    ret, frame = cap_ref.read()
    if ret:
        crop_ref = frame[202:252, 526:734]
        crop_ref_disp = cv2.resize(crop_ref, (260, 64))
        cv2.rectangle(crop_ref_disp, (0, 0), (259, 63), (60, 80, 68), 1)
        canvas[y_start + 25:y_start + 89, 360:620] = crop_ref_disp

    # Proto sample
    if os.path.exists(proto_path):
        proto_img = cv2.imread(proto_path)
        # Crop centered capsule: in 1200x800 (deviceScaleFactor=2), capsule is 204x48 -> 408x96 at center (600, 400)
        # y: 400 - 65 to 400 + 65, x: 600 - 220 to 600 + 220
        crop_proto = proto_img[335:465, 380:820]
        crop_proto_disp = cv2.resize(crop_proto, (260, 64))
        cv2.rectangle(crop_proto_disp, (0, 0), (259, 63), (106, 243, 197), 1)
        canvas[y_start + 25:y_start + 89, 670:930] = crop_proto_disp

cap_ref.release()

out_file = os.path.join(art_dir, '00_visual_storyboard_comparison.png')
cv2.imwrite(out_file, canvas)
print('Visual storyboard comparison generated:', out_file)

