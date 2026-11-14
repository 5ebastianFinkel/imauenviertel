import { describe, expect, it } from 'vitest';
import { resizedImageUrl, responsiveImage } from '../utils/images';

const cloudinary = 'https://res.cloudinary.com/dc6swddrn/image/upload';

describe('resizedImageUrl: Cloudinary', () => {
  it('should add the resize transformation before the version', () => {
    expect(resizedImageUrl(`${cloudinary}/v1765106474/Eingangst%C3%BCr_KGV_jomfrf.jpg`, 800)).toBe(
      `${cloudinary}/f_auto,q_auto,c_limit,w_800/v1765106474/Eingangst%C3%BCr_KGV_jomfrf.jpg`,
    );
  });

  it('should keep transformations the CMS added and apply ours last', () => {
    expect(resizedImageUrl(`${cloudinary}/c_crop,g_face/a_90/v1/folder/photo.jpg`, 480)).toBe(
      `${cloudinary}/c_crop,g_face/a_90/f_auto,q_auto,c_limit,w_480/v1/folder/photo.jpg`,
    );
  });

  it('should leave URLs without a version alone', () => {
    // Without the version, folders cannot be told apart from transformations
    expect(resizedImageUrl(`${cloudinary}/folder/photo.jpg`, 800)).toBeUndefined();
  });

  it('should leave other clouds and delivery types alone', () => {
    expect(resizedImageUrl('https://res.cloudinary.com/someone-else/image/upload/v1/photo.jpg', 800)).toBeUndefined();
    expect(resizedImageUrl('https://res.cloudinary.com/dc6swddrn/image/fetch/v1/photo.jpg', 800)).toBeUndefined();
    expect(resizedImageUrl('https://res.cloudinary.com/dc6swddrn/raw/upload/v1/file.pdf', 800)).toBeUndefined();
  });
});

describe('resizedImageUrl: Unsplash', () => {
  it('should replace the width and keep the other parameters', () => {
    const url = new URL(
      resizedImageUrl('https://images.unsplash.com/photo-1?q=80&w=2874&auto=format&fit=crop&ixid=abc%3D%3D', 800)!,
    );
    expect(url.searchParams.get('w')).toBe('800');
    expect(url.searchParams.get('q')).toBe('80');
    expect(url.searchParams.get('fit')).toBe('crop');
    expect(url.searchParams.get('auto')).toBe('format');
    expect(url.searchParams.get('ixid')).toBe('abc==');
  });

  it('should ask for automatic formats', () => {
    expect(new URL(resizedImageUrl('https://images.unsplash.com/photo-1', 480)!).searchParams.get('auto')).toBe(
      'format',
    );
    expect(
      new URL(resizedImageUrl('https://images.unsplash.com/photo-1?auto=compress', 480)!).searchParams.get('auto'),
    ).toBe('compress,format');
  });
});

describe('resizedImageUrl: other images', () => {
  it('should leave local files and unknown hosts alone', () => {
    expect(resizedImageUrl('/uploads/photo.jpg', 800)).toBeUndefined();
    expect(resizedImageUrl('../../assets/photo.webp', 800)).toBeUndefined();
    expect(resizedImageUrl('https://example.com/photo.jpg', 800)).toBeUndefined();
    expect(resizedImageUrl('http://images.unsplash.com/photo-1', 800)).toBeUndefined();
  });
});

describe('responsiveImage', () => {
  it('should leave images it cannot resize alone', () => {
    expect(responsiveImage('/uploads/photo.jpg', '100vw')).toEqual({ src: '/uploads/photo.jpg' });
  });

  it('should offer all widths with a mid-sized fallback', () => {
    const image = responsiveImage(`${cloudinary}/v1/photo.jpg`, '100vw');
    expect(image.sizes).toBe('100vw');
    expect(image.src).toBe(`${cloudinary}/f_auto,q_auto,c_limit,w_1200/v1/photo.jpg`);
    expect(image.srcSet?.split(', ').map((entry) => entry.split(' ')[1])).toEqual([
      '480w',
      '800w',
      '1200w',
      '1600w',
      '2000w',
    ]);
  });
});
