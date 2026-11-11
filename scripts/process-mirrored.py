import cv2
import os
import glob
import numpy as np

art_dir = r'C:/Users/ershe/.gemini/antigravity/brain/b58e3653-aa6a-4f16-9d8c-3455f0be56f0/theme_qa'
os.makedirs(art_dir, exist_ok=True)
rec_base = r'C:/Portfolio/scratch/recordings_mirrored'

def make_video(frame_files, out_path, fps=20):
    if not frame_files:
        return
    first = cv2.imread(frame_files[0])
    h, w, _ = first.shape
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(out_path, fourcc, fps, (w, h))
    for f in frame_files:
        img = cv2.imread(f)
        out.write(img)
    out.release()
    print(f'Created video: {out_path} ({len(frame_files)} frames @ {fps} fps)')

l2d_desktop = sorted(glob.glob(os.path.join(rec_base, 'desktop_light_to_dark_ltr', '*.png')))
d2l_desktop = sorted(glob.glob(os.path.join(rec_base, 'desktop_dark_to_light_rtl', '*.png')))
l2d_mobile = sorted(glob.glob(os.path.join(rec_base, 'mobile_light_to_dark_ltr', '*.png')))
d2l_mobile = sorted(glob.glob(os.path.join(rec_base, 'mobile_dark_to_light_rtl', '*.png')))

# 1. Export Individual MP4s
make_video(l2d_desktop, os.path.join(art_dir, 'v4_desktop_light_to_dark_ltr.mp4'), fps=20)
make_video(d2l_desktop, os.path.join(art_dir, 'v4_desktop_dark_to_light_rtl.mp4'), fps=20)
make_video(l2d_mobile, os.path.join(art_dir, 'v4_mobile_light_to_dark_ltr.mp4'), fps=30)
make_video(d2l_mobile, os.path.join(art_dir, 'v4_mobile_dark_to_light_rtl.mp4'), fps=30)

# 2. Export Synchronized Side-by-Side Mirrored Video
num_sync = min(len(l2d_desktop), len(d2l_desktop))
out_w, out_h = 860, 240
fourcc = cv2.VideoWriter_fourcc(*'mp4v')
sbs_path = os.path.join(art_dir, 'v4_side_by_side_mirrored_choreography.mp4')
out_sbs = cv2.VideoWriter(sbs_path, fourcc, 20.0, (out_w, out_h))

for i in range(num_sync):
    f_l2d = cv2.imread(l2d_desktop[i])
    f_d2l = cv2.imread(d2l_desktop[i])

    crop_l2d = f_l2d[12:68, 1010:1370] # 360w x 56h
    crop_d2l = f_d2l[12:68, 1010:1370]

    crop_l2d_disp = cv2.resize(crop_l2d, (400, 140))
    crop_d2l_disp = cv2.resize(crop_d2l, (400, 140))

    canvas = np.zeros((out_h, out_w, 3), dtype=np.uint8)
    canvas[:] = (12, 15, 13)

    cv2.putText(canvas, 'LIGHT -> DARK: LEFT TO RIGHT DIVE', (30, 32), cv2.FONT_HERSHEY_SIMPLEX, 0.50, (240, 210, 140), 1)
    cv2.putText(canvas, 'DARK -> LIGHT: RIGHT TO LEFT DIVE', (460, 32), cv2.FONT_HERSHEY_SIMPLEX, 0.50, (106, 243, 197), 1)

    cv2.rectangle(crop_l2d_disp, (0, 0), (399, 139), (60, 70, 65), 1)
    cv2.rectangle(crop_d2l_disp, (0, 0), (399, 139), (60, 70, 65), 1)

    canvas[55:195, 20:420] = crop_l2d_disp
    canvas[55:195, 440:840] = crop_d2l_disp

    cv2.putText(canvas, f'Frame {i:02d} | Mirrored Kinematics: LTR -> Right Portal | RTL -> Left Portal', (180, 222), cv2.FONT_HERSHEY_SIMPLEX, 0.40, (180, 180, 180), 1)
    out_sbs.write(canvas)

out_sbs.release()
print('Created mirrored side-by-side video:', sbs_path)

# 3. Create 6-Stage Symmetrical Grid Montage
stage_indices = [
    (1, 'STAGE 1: INITIAL APPEARANCE (LTR: Left | RTL: Right)'),
    (8, 'STAGE 2: STRIDE (LTR: Walks Right | RTL: Walks Left)'),
    (15, 'STAGE 3: JUMP ARC & DIVE (LTR: Right Portal | RTL: Left Portal)'),
    (21, 'STAGE 4: SUBMERGED VOID & THEME SWAP (Occluded behind rim)'),
    (28, 'STAGE 5: EMERGENCE & PALETTE TRANSITION'),
    (min(36, num_sync - 1), 'STAGE 6: FINAL RESTORED SINGLE-ROW NAVBAR')
]

grid_w = 900
row_h = 100
total_h = 70 + len(stage_indices) * (row_h + 24)
grid_canvas = np.zeros((total_h, grid_w, 3), dtype=np.uint8)
grid_canvas[:] = (12, 15, 13)

cv2.putText(grid_canvas, 'MIRRORED THEME TRANSITION: DIRECTION-DEPENDENT CHOREOGRAPHY', (25, 32), cv2.FONT_HERSHEY_SIMPLEX, 0.60, (255, 255, 255), 2)
cv2.putText(grid_canvas, 'Light->Dark (LTR into Right Portal) vs Dark->Light (RTL into Left Portal) | Single-Row Aligned', (25, 52), cv2.FONT_HERSHEY_SIMPLEX, 0.40, (106, 243, 197), 1)

for i, (idx, stage_title) in enumerate(stage_indices):
    y_start = 68 + i * (row_h + 24)
    cv2.putText(grid_canvas, stage_title, (25, y_start + 14), cv2.FONT_HERSHEY_SIMPLEX, 0.40, (200, 200, 200), 1)

    f_l2d = cv2.imread(l2d_desktop[min(idx, len(l2d_desktop)-1)])
    f_d2l = cv2.imread(d2l_desktop[min(idx, len(d2l_desktop)-1)])

    crop_l2d = cv2.resize(f_l2d[14:66, 1020:1360], (410, row_h - 10))
    crop_d2l = cv2.resize(f_d2l[14:66, 1020:1360], (410, row_h - 10))

    cv2.rectangle(crop_l2d, (0, 0), (409, row_h - 11), (50, 60, 55), 1)
    cv2.rectangle(crop_d2l, (0, 0), (409, row_h - 11), (50, 60, 55), 1)

    cv2.putText(crop_l2d, 'Light -> Dark (LTR)', (10, 18), cv2.FONT_HERSHEY_SIMPLEX, 0.38, (240, 210, 140), 1)
    cv2.putText(crop_d2l, 'Dark -> Light (RTL)', (10, 18), cv2.FONT_HERSHEY_SIMPLEX, 0.38, (106, 243, 197), 1)

    grid_canvas[y_start + 20:y_start + 20 + crop_l2d.shape[0], 25:435] = crop_l2d
    grid_canvas[y_start + 20:y_start + 20 + crop_d2l.shape[0], 465:875] = crop_d2l

grid_out_path = os.path.join(art_dir, 'v4_mirrored_stage_grid.png')
cv2.imwrite(grid_out_path, grid_canvas)
print('Created mirrored stage grid montage:', grid_out_path)

print('Mirrored post-processing complete!')

