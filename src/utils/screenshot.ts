import html2canvas from 'html2canvas';

export const captureScreenshot = async (element: HTMLElement): Promise<void> => {
  try {
    // Create canvas with better resolution
    const canvas = await html2canvas(element, {
      scale: 2, // 2x resolution for better quality
      backgroundColor: '#ffffff',
      logging: false,
      useCORS: true, // Enable CORS for external images
      allowTaint: true,
    });

    // Convert to blob
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => resolve(blob!), 'image/png', 1.0);
    });

    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tech-stack-diagram-${new Date().toISOString().slice(0, 10)}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Screenshot capture error:', error);
    throw new Error('Failed to capture screenshot');
  }
};