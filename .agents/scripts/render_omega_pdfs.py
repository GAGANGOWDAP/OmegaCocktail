import fitz
from pathlib import Path

files = [
    Path('attached_assets/page_3_1786598795879.pdf'),
    Path('attached_assets/Profile_Suresh_Naidu_1786598795880.pdf'),
    Path('attached_assets/MANOJ_Resume_1786598795877.pdf'),
]
out = Path('.agents/outputs/omega-pdf-renders')
out.mkdir(parents=True, exist_ok=True)
for path in files:
    doc = fitz.open(path)
    stem = path.stem
    print(f'{path}: {doc.page_count} pages')
    for i, page in enumerate(doc):
        pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
        dest = out / f'{stem}-page-{i+1}.png'
        pix.save(dest)
        print(dest)
        print('images:', len(page.get_images(full=True)), 'rect:', page.rect)
        for j, img in enumerate(page.get_images(full=True)):
            xref = img[0]
            extracted = doc.extract_image(xref)
            if extracted:
                img_dest = out / f'{stem}-page-{i+1}-img-{j+1}.{extracted["ext"]}'
                img_dest.write_bytes(extracted['image'])
                print(' embedded:', img_dest, extracted['width'], extracted['height'])
