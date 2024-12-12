# Thai Text-to-Speech Implementations

This repository contains multiple implementations of a Thai Text-to-Speech converter, each built with different technologies and approaches. The project aims to demonstrate various ways to create a bilingual text-to-speech application with support for Thai and English languages.

## Project Versions

### 1. Next.js Implementation (`/thai-tts-next`)
Modern web application built with Next.js, TailwindCSS, and ShadCN UI.

**Features:**
- 🎨 Modern UI with New York theme
- 🔄 Real-time voice parameter adjustments
- 🌐 Bilingual support (Thai/English)
- ⚡ Auto-speech feature
- 🎛️ Advanced voice settings

**Tech Stack:**
- Next.js 14
- React 18
- TailwindCSS
- TypeScript
- ShadCN UI

[View Next.js Implementation Details](./thai-tts-next/README.md)

### 2. HTML/JavaScript Implementation (`/thai-tts-web-html`)
Lightweight, vanilla JavaScript implementation using the Web Speech API.

**Features:**
- 🚀 Zero dependencies
- 💡 Simple and straightforward
- 🔊 Basic voice controls
- 🌍 Language switching

**Tech Stack:**
- HTML5
- CSS3
- Vanilla JavaScript
- Web Speech API

## Quick Start

### Next.js Version
```bash
cd thai-tts-next
npm install
npm run dev
```
Visit `http://localhost:3000`

### HTML Version
```bash
cd thai-tts-web-html
# Use any static file server, e.g.:
python -m http.server 8000
```
Visit `http://localhost:8000`

## Features Comparison

| Feature                    | Next.js Version | HTML Version |
|---------------------------|-----------------|--------------|
| Modern UI                 | ✅              | ❌           |
| Parameter Tuning          | ✅              | ❌           |
| Auto-Speech               | ✅              | ✅           |
| Dark Mode                 | ✅              | ❌           |
| Zero Dependencies         | ❌              | ✅           |
| TypeScript Support        | ✅              | ❌           |
| Responsive Design         | ✅              | ✅           |
| Voice Selection           | ✅              | ✅           |
| Settings Persistence      | ✅              | ❌           |

## Browser Compatibility

Both implementations use the Web Speech API, which is supported in:
- Chrome 33+
- Edge 14+
- Safari 7+
- Firefox 49+
- Opera 21+

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Project Structure

```
BrowserTextToSpeech/
├── thai-tts-next/           # Next.js implementation
│   ├── src/
│   ├── public/
│   └── README.md
│
├── thai-tts-web-html/       # HTML/JS implementation
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── README.md               # This file
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [ShadCN UI](https://ui.shadcn.com/)

## Future Improvements

1. Add more language support
2. Implement voice recording feature
3. Add text analysis tools
4. Create mobile applications
5. Add support for longer texts
6. Implement text formatting options
7. Add export functionality for generated speech

## Support

For support, please open an issue in the repository or contact the maintainers.
