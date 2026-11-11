import cv2
import os
import glob
import numpy as np
import shutil

art_dir = r'C:/Users/ershe/.gemini/antigravity/brain/b58e3653-aa6a-4f16-9d8c-3455f0be56f0/theme_qa'
os.makedirs(art_dir, exist_ok=True)

rec_base = r'C:/Portfolio/scratch/recordings'

def make_video(frame_files, out_path, fps=30):
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

def make_montage(img_list, cols=4):
    rows = (len(img_list) + cols - 1) // cols
    h, w, c = img_list[0].shape
    montage = np.zeros((rows * h, cols * w, 3), dtype=np.uint8)
    for i, img in enumerate(img_list):
        r = i // cols
        col = i % cols
        montage[r*h:(r+1)*h, col*w:(col+1)*w] = img
    return montage

# 1. Process Dark to Light (Desktop)
d2l_frames = sorted(glob.glob(os.path.join(rec_base, 'dark_to_light_desktop', '*.png')))
print(f'Dark to Light frames: {len(d2l_frames)}')

# Generate normal speed video (30 fps)
make_video(d2l_frames, os.path.join(art_dir, '01_dark_to_light_normal.mp4'), fps=30)
# Generate slow motion video (15 fps = 0.5x speed)
make_video(d2l_frames, os.path.join(art_dir, '02_dark_to_light_slowmo.mp4'), fps=15)

# 2. Process Light to Dark (Desktop)
l2d_frames = sorted(glob.glob(os.path.join(rec_base, 'light_to_dark_desktop', '*.png')))
print(f'Light to Dark frames: {len(l2d_frames)}')

make_video(l2d_frames, os.path.join(art_dir, '03_light_to_dark_normal.mp4'), fps=30)
make_video(l2d_frames, os.path.join(art_dir, '04_light_to_dark_slowmo.mp4'), fps=15)

# 3. Process Mobile Dark to Light
mob_frames = sorted(glob.glob(os.path.join(rec_base, 'dark_to_light_mobile', '*.png')))
print(f'Mobile frames: {len(mob_frames)}')

make_video(mob_frames, os.path.join(art_dir, '05_mobile_dark_to_light.mp4'), fps=30)

# 4. Generate Keyframe Montages of Capsule Area
# On desktop (1280x720), capsule is top right: x: 880..1260, y: 10..200
def extract_capsule_montage(frames, label, out_name):
    selected_crops = []
    # Pick 8 evenly spaced frames during the action
    indices = np.linspace(5, len(frames)-5, 8, dtype=int)
    for idx in indices:
        f = frames[idx]
        img = cv2.imread(f)
        # Crop capsule region
        crop = img[20:180, 880:1250].copy()
        cv2.putText(crop, f'F{idx:02d} ({idx*33}ms)', (10, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.45, (255, 255, 255), 1)
        selected_crops.append(crop)
    
    m = make_montage(selected_crops, cols=4)
    cv2.imwrite(os.path.join(art_dir, out_name), m)
    print(f'Saved montage: {out_name}')

extract_capsule_montage(d2l_frames, 'D2L', '06_dark_to_light_capsule_montage.png')
extract_capsule_montage(l2d_frames, 'L2D', '07_light_to_dark_capsule_montage.png')

# 5. Extract Mobile Header Montage
mob_crops = []
mob_indices = np.linspace(5, len(mob_frames)-5, 8, dtype=int)
for idx in mob_indices:
    f = mob_frames[idx]
    img = cv2.imread(f)
    # Mobile is 780x1688 (2x of 390x844). Header is y: 0..360, x: 0..780
    crop = img[20:340, 20:760].copy()
    crop_small = cv2.resize(crop, (360, 160))
    cv2.putText(crop_small, f'F{idx:02d} ({idx*25}ms)', (10, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.45, (255, 255, 255), 1)
    mob_crops.append(crop_small)

mob_m = make_montage(mob_crops, cols=4)
cv2.imwrite(os.path.join(art_dir, '08_mobile_header_montage.png'), mob_m)
print('Saved mobile montage: 08_mobile_header_montage.png')

# 6. Side-by-side comparison montage with Reference Video
# Load reference card montage
ref_m1 = cv2.imread(r'C:/Portfolio/scratch/card_transition_1_montage.png')
if ref_m1 is not None:
    shutil.copyfile(r'C:/Portfolio/scratch/card_transition_1_montage.png', os.path.join(art_dir, '09_reference_transition_montage.png'))
    print('Copied reference montage: 09_reference_transition_montage.png')

print('All post-processing complete.')

