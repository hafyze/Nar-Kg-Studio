// Handle GET request and return images data
export async function GET() {
  return new Response(JSON.stringify([
    {
      alt: 'front',
      src: '/images/front.jpg',
      title: 'Front look',
    },
    {
      alt: 'Bed',
      src: '/images/bed.jpg',
      title: 'Cozy Bed',
    },
    {
      alt: 'Bed2',
      src: '/images/bed2.jpg',
      title: 'Cozy Bed',
    },
    {
      alt: 'Table',
      src: '/images/table.jpg',
      title: 'Table',
    },
    {
      alt: 'Kitchen',
      src: '/images/kitchen.jpg',
      title: 'Kitchen',
    },
    {
      alt: 'Toilet',
      src: '/images/toilet.jpg',
      title: 'Toilet',
    },
  ]));
}
