import cv2
import os
import glob
import numpy as np

art_dir = r'C:/Users/ershe/.gemini/antigravity/brain/b58e3653-aa6a-4f16-9d8c-3455f0be56f0/theme_qa'

# Reference video path:
ref_path = r'C:/Users/ershe/.gemini/antigravity/brain/b58e3653-aa6a-4f16-9d8c-3455f0be56f0/.user_uploaded/media_1794373744707_2e84bb77.mp4'

# In reference video, the first transition begins around frame 225 to 285 (60 frames at 60fps = 1.0s)
cap_ref = cv2.VideoCapture(ref_path)

# New recording frames for Light to Dark:
cur_frames = sorted(glob.glob(r'C:/Portfolio/scratch/recordings/light_to_dark_desktop/*.png'))

# We will create side by side video:
# Left: Reference (Nov 8)
# Right: New Reproduction
# Size: 400x200 each -> combined 820x240 with headers
out_w, out_h = 820, 240
fourcc = cv2.VideoWriter_fourcc(*'mp4v')
out_path = os.path.join(art_dir, '10_side_by_side_comparison.mp4')
out = cv2.VideoWriter(out_path, fourcc, 25.0, (out_w, out_h))

ref_start_frame = 224
num_frames = min(50, len(cur_frames))

for i in range(num_frames):
    # Reference frame: sample at 1.2x rate to match 30fps screencast
    ref_f_idx = int(ref_start_frame + i * 1.2)
    cap_ref.set(cv2.CAP_PROP_POS_FRAMES, ref_f_idx)
    ret_ref, f_ref = cap_ref.read()
    if not ret_ref:
        break
    
    # Crop capsule from reference (it was in 390px mobile frame centered in 1280x720)
    # y: 135..295, x: 465..805 (160h x 340w)
    crop_ref = f_ref[135:295, 465:805]
    crop_ref_resized = cv2.resize(crop_ref, (390, 180))

    # Current new frame:
    f_cur = cv2.imread(cur_frames[i])
    # Crop capsule from desktop (y: 20..190, x: 890..1250)
    crop_cur = f_cur[20:190, 890:1250]
    crop_cur_resized = cv2.resize(crop_cur, (390, 180))

    # Canvas
    canvas = np.zeros((out_h, out_w, 3), dtype=np.uint8)
    canvas[:] = (15, 18, 16) # dark slate bg

    # Header labels
    cv2.putText(canvas, 'NOVEMBER 8 REFERENCE', (80, 28), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (180, 180, 180), 2)
    cv2.putText(canvas, 'CURRENT REPRODUCTION', (490, 28), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (106, 243, 197), 2)

    # Place crops
    canvas[45:225, 15:405] = crop_ref_resized
    canvas[45:225, 415:805] = crop_cur_resized

    out.write(canvas)

cap_ref.release()
out.release()
print('Side-by-side comparison video created:', out_path)

