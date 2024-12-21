import { jsPDF } from 'jspdf';

const svgToCanvas = async (svgContent: string, scale = 2): Promise<HTMLCanvasElement> => {
  // Create a temporary container for the SVG
  const container = document.createElement('div');
  container.innerHTML = svgContent;
  const svg = container.firstElementChild as SVGElement;
  
  if (!svg) {
    throw new Error('Invalid SVG element');
  }
  
  // Get SVG dimensions
  const width = parseFloat(svg.getAttribute('width') || '800');
  const height = parseFloat(svg.getAttribute('height') || '600');
  
  // Create canvas with proper dimensions
  const canvas = document.createElement('canvas');
  canvas.width = width * scale;
  canvas.height = height * scale;
  
  // Convert SVG to data URL
  const svgData = new XMLSerializer().serializeToString(svg);
  const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    
    img.onload = () => {
      try {
        const ctx = canvas.getContext('2d')!;
        ctx.scale(scale, scale);
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas);
      } catch (error) {
        reject(new Error('Failed to render SVG to canvas'));
      } finally {
        URL.revokeObjectURL(url);
      }
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load SVG image'));
    };
    
    img.src = url;
  });
};

export const formatPDF = async (svgContent: string): Promise<Blob> => {
  try {
    // Convert SVG to canvas first
    const canvas = await svgToCanvas(svgContent);
    
    // Get dimensions (in points, assuming 72 DPI)
    const width = canvas.width * 0.75; // Convert to points (72 DPI)
    const height = canvas.height * 0.75;
    
    // Create PDF with proper dimensions
    const pdf = new jsPDF({
      orientation: width > height ? 'landscape' : 'portrait',
      unit: 'pt',
      format: [width, height]
    });
    
    // Convert canvas to data URL
    const imgData = canvas.toDataURL('image/png');
    
    // Add the image to PDF
    pdf.addImage(imgData, 'PNG', 0, 0, width, height, undefined, 'FAST');
    
    // Add metadata
    pdf.setProperties({
      title: 'Technical Stack Diagram',
      creator: 'Technical Stack Diagram Generator',
      creationDate: new Date()
    });
    
    return pdf.output('blob');
  } catch (error) {
    throw new Error('Failed to generate PDF: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }
};