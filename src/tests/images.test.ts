import { describe, expect, it } from 'vitest';
import { canTransform, imageCdnUrl, responsiveImage } from '../utils/images';

describe('canTransform', () => {
  it('should accept site images and allowed remote hosts', () => {
    expect(canTransform('/uploads/photo.jpg')).toBe(true);
    expect(canTransform('https://images.unsplash.com/photo-1?w=2874')).toBe(true);
    expect(canTransform('https://res.cloudinary.com/demo/image/upload/a.jpg')).toBe(true);
  });

  it('should reject other hosts, protocol-relative and relative URLs', () => {
    expect(canTransform('https://example.com/photo.jpg')).toBe(false);
    expect(canTransform('http://images.unsplash.com/photo-1')).toBe(false);
    expect(canTransform('//images.unsplash.com/photo-1')).toBe(false);
    expect(canTransform('../../assets/photo.webp')).toBe(false);
    expect(canTransform('/.netlify/images?url=%2Fa.jpg')).toBe(false);
  });
});

describe('imageCdnUrl', () => {
  it('should encode the source as a query value', () => {
    expect(imageCdnUrl('/uploads/photo.jpg', 800)).toBe('/.netlify/images?url=%2Fuploads%2Fphoto.jpg&w=800');
  });

  it('should percent-encode local file names exactly once', () => {
    const expected = '/.netlify/images?url=%2Fuploads%2FKleing%25C3%25A4rtner%2520Checklist.jpg&w=480';
    expect(imageCdnUrl('/uploads/Kleingärtner Checklist.jpg', 480)).toBe(expected);
    expect(imageCdnUrl('/uploads/Kleing%C3%A4rtner%20Checklist.jpg', 480)).toBe(expected);
  });

  it('should keep the query string of remote images', () => {
    expect(imageCdnUrl('https://images.unsplash.com/photo-1?w=2874&fit=crop', 800)).toBe(
      '/.netlify/images?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1%3Fw%3D2874%26fit%3Dcrop&w=800',
    );
  });
});

describe('responsiveImage', () => {
  it('should leave images it cannot transform alone', () => {
    expect(responsiveImage('https://example.com/photo.jpg')).toEqual({ src: 'https://example.com/photo.jpg' });
  });

  it('should offer all widths when the image size is unknown', () => {
    const image = responsiveImage('https://images.unsplash.com/photo-1');
    expect(image.srcSet?.split(', ').map((entry) => entry.split(' ')[1])).toEqual([
      '480w',
      '800w',
      '1200w',
      '1600w',
      '2000w',
    ]);
    expect(image.src).toContain('&w=1200');
  });

  it('should not scale small images up', () => {
    const image = responsiveImage('/uploads/small.jpg', 460);
    expect(image.srcSet).toBe('/.netlify/images?url=%2Fuploads%2Fsmall.jpg&w=460 460w');
    expect(image.src).toBe('/.netlify/images?url=%2Fuploads%2Fsmall.jpg&w=460');
  });

  it('should end the widths at the image width', () => {
    const image = responsiveImage('/uploads/photo.jpg', 1267);
    expect(image.srcSet?.split(', ').map((entry) => entry.split(' ')[1])).toEqual(['480w', '800w', '1200w', '1267w']);
  });
});
