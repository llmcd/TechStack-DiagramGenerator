export class TitleRenderer {
  render(): string {
    return `
      <text 
        x="400" 
        y="40"
        text-anchor="middle" 
        font-family="Arial" 
        font-size="24" 
        font-weight="bold"
        fill="#111827"
      >
        Technical Stack Diagram
      </text>
    `;
  }
}