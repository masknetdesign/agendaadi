const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const iconDirectory = path.join(__dirname, 'icons');

// Criar diretório de ícones se não existir
if (!fs.existsSync(iconDirectory)) {
    fs.mkdirSync(iconDirectory);
}

// Criar SVG base
const svgIcon = `
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#1a365d;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#2c5282;stop-opacity:1" />
        </linearGradient>
    </defs>
    <rect width="512" height="512" fill="url(#grad)"/>
    <circle cx="256" cy="256" r="200" fill="white"/>
    <text x="256" y="256" 
          font-family="Arial" 
          font-size="120" 
          font-weight="bold" 
          fill="#1a365d" 
          text-anchor="middle" 
          dominant-baseline="middle">ADI</text>
</svg>`;

// Função para gerar ícones
async function generateIcons() {
    try {
        // Gerar ícones em diferentes tamanhos
        for (const size of sizes) {
            await sharp(Buffer.from(svgIcon))
                .resize(size, size)
                .toFile(path.join(iconDirectory, `icon-${size}x${size}.png`));
            
            console.log(`Ícone ${size}x${size} gerado com sucesso`);
        }

        console.log('Todos os ícones foram gerados com sucesso!');
    } catch (error) {
        console.error('Erro ao gerar ícones:', error);
    }
}

generateIcons(); 