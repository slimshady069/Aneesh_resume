from PIL import Image, ImageDraw, ImageFont
import os

def create_directory(path):
    if not os.path.exists(path):
        os.makedirs(path)

def generate_image(width, height, text, output_path, bg_color=(255, 255, 255), text_color=(0, 0, 0)):
    # Create image with white background
    image = Image.new('RGB', (width, height), bg_color)
    draw = ImageDraw.Draw(image)
    
    # Add text
    try:
        font = ImageFont.truetype("Arial", 30)
    except:
        font = ImageFont.load_default()
    
    # Calculate text position for center alignment
    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]
    x = (width - text_width) // 2
    y = (height - text_height) // 2
    
    # Draw text
    draw.text((x, y), text, font=font, fill=text_color)
    
    # Save image
    image.save(output_path)

def main():
    # Create directories
    create_directory('images/providers')
    create_directory('images/testimonials')
    
    # Generate provider logos
    providers = {
        'manulife.png': (200, 100),
        'sunlife.png': (200, 100),
        'desjardins.png': (200, 100),
        'empire.png': (200, 100),
        'equitable.png': (200, 100),
        'ia.png': (200, 100)
    }
    
    for filename, size in providers.items():
        generate_image(
            size[0], size[1],
            filename.split('.')[0].upper(),
            f'images/providers/{filename}'
        )
    
    # Generate testimonial images
    for i in range(1, 4):
        generate_image(
            300, 300,
            f'Testimonial {i}',
            f'images/testimonial-{i}.jpg'
        )
    
    # Generate insurance hero image
    generate_image(
        1920, 1080,
        'Insurance Hero',
        'images/insurance-hero.jpg'
    )

if __name__ == '__main__':
    main() 