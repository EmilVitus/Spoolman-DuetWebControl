# 🤝 Contributing til Spoolman DuetWebControl Integration

Tak for din interesse i at bidrage til projektet! Vi glæder os over alle bidrag, uanset om det er bug fixes, nye features, dokumentation eller feedback.

## 📋 **Hvordan Kan Du Bidrage?**

### 🐛 **Bug Reports**
- Brug [GitHub Issues](https://github.com/EmilVitus/Spoolman-DuetWebControl/issues)
- Inkluder detaljeret beskrivelse af problemet
- Tilføj browser konsol output (F12)
- Specificer din DWC version og browser type
- Beskriv trin til at reproducere fejlen

### 💡 **Feature Requests**
- Brug [GitHub Discussions](https://github.com/EmilVitus/Spoolman-DuetWebControl/discussions)
- Beskriv dit use case og hvorfor featuren er nyttig
- Foreslå potentielle implementation tilgange
- Diskuter med andre brugere først

### 📝 **Documentation**
- Forbedring af README, installation guides eller comments
- Oversættelser til andre sprog
- Screenshots eller video tutorials
- FAQ opdateringer

### 🔧 **Code Contributions**
- Bug fixes i JavaScript kode
- UI/UX forbedringer
- Performance optimizations
- Cross-browser compatibility fixes

## 🚀 **Development Setup**

### **Forudsætninger:**
- Node.js 16+ (for development tools)
- Git klient
- DuetWebControl development environment
- Test 3D printer med RRF (anbefalet)

### **Fork og Clone:**
```bash
# Fork repository på GitHub først
git clone https://github.com/DIT-BRUGERNAVN/Spoolman-DuetWebControl.git
cd Spoolman-DuetWebControl

# Tilføj upstream remote
git remote add upstream https://github.com/EmilVitus/Spoolman-DuetWebControl.git
```

### **Development Workflow:**
```bash
# Opret feature branch
git checkout -b feature/min-nye-feature

# Lav dine ændringer
# Test grundigt

# Commit med beskrivende besked
git commit -m "feat: tilføj support for nye filament typer"

# Push til dit fork
git push origin feature/min-nye-feature

# Opret Pull Request på GitHub
```

## 📝 **Coding Standards**

### **JavaScript Style:**
- Brug ES5 syntax for kompatibilitet med DWC
- Konsistente indentations (2 spaces)
- Beskrivende variable navne (dansk eller engelsk)
- Console.log statements til debugging

### **Vue.js Komponenter:**
- Følg Vue 2.x patterns (DWC bruger Vue 2)
- Brug render functions i stedet for templates
- Reactive data properties med proper naming

### **Commit Messages:**
Følg [Conventional Commits](https://conventionalcommits.org/):
```
feat: ny feature
fix: bug fix
docs: dokumentation ændringer
style: code style ændringer
refactor: code refactoring
test: tilføj eller opdater tests
chore: vedligeholdelse opgaver
```

### **Branching Strategy:**
- `main` - stable releases
- `develop` - development branch
- `feature/beskrivelse` - nye features
- `fix/beskrivelse` - bug fixes
- `docs/beskrivelse` - dokumentation

## 🧪 **Testing Guidelines**

### **Manuel Testing:**
- Test med både demo mode og rigtig Spoolman server
- Verificer på multiple browsers (Chrome, Firefox, Safari)
- Test responsive design på mobile enheder
- Verificer CORS setup virker korrekt

### **Test Cases:**
- [ ] Plugin indlæser uden fejl
- [ ] Navigation tab er synlig
- [ ] Demo mode virker korrekt
- [ ] Spoolman forbindelse etableres
- [ ] Filament valg gemmes og synkroniseres
- [ ] Tracking funktionalitet virker
- [ ] Cross-device sync virker
- [ ] Error handling vises korrekt

### **Browser Console Testing:**
- Ingen JavaScript fejl i konsol
- CORS requests lykkes
- Debug log outputs er informative
- Performance er acceptabel

## 📦 **Pull Request Process**

### **Før Du Submitter:**
1. ✅ Test dine ændringer grundigt
2. ✅ Opdater dokumentation hvis nødvendigt
3. ✅ Check at koden følger style guidelines
4. ✅ Rebase din branch på latest main
5. ✅ Skriv en klar PR beskrivelse

### **PR Template:**
```markdown
## Description
[Klar beskrivelse af ændringerne]

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Other: [specificer]

## Testing
- [ ] Tested in demo mode
- [ ] Tested with real Spoolman server
- [ ] Cross-browser testing completed
- [ ] Mobile responsive testing done

## Screenshots/Videos
[Hvis relevant - tilføj screenshots]

## Additional Notes
[Eventuelle særlige noter eller bekymringer]
```

### **Review Process:**
1. Maintainer review (Emil Vitus)
2. Automated testing (hvis tilgængelig)
3. Community feedback periode
4. Final approval og merge

## 🔒 **Security Considerations**

### **Code Security:**
- Ingen hardcoded credentials eller tokens
- Proper input validation og sanitization
- CORS headers konfigureret sikkert
- Ingen sensitive data i console logs

### **API Security:**
- Proper HTTP method usage (GET, POST, PUT, PATCH)
- Appropriate error handling uden at eksponere internals
- Rate limiting considerations for API calls

## 🌐 **Internationalization**

### **Sprog Support:**
- Primær sprog: Dansk
- Sekundær sprog: Engelsk (for global community)
- Konsistente sprog valg i UI strings
- Clear variable naming uanset sprog

### **Tilføj Nye Sprog:**
```javascript
var messages = {
  da: {
    'connect_button': 'Forbind til Spoolman Server',
    'demo_button': 'Start med Demo Data'
  },
  en: {
    'connect_button': 'Connect to Spoolman Server',
    'demo_button': 'Start with Demo Data'
  }
};
```

## 📊 **Performance Guidelines**

### **Code Performance:**
- Minimal DOM manipulation i render functions
- Debounce user input events
- Lazy loading af heavy resources
- Efficient Vue.js reactivity usage

### **Network Performance:**
- Batch API requests når muligt
- Appropriate caching strategies
- Handle slow network connections gracefully
- Minimize polling frequency

## 🎯 **Feature Development Process**

### **Planning Phase:**
1. Diskuter idé i GitHub Discussions
2. Create detailed feature specification
3. Break down i mindre tasks
4. Estimate development time

### **Development Phase:**
1. Create feature branch
2. Implement core functionality
3. Add error handling
4. Write documentation
5. Test thoroughly

### **Review Phase:**
1. Self-review kode quality
2. Submit pull request
3. Address reviewer feedback
4. Final testing før merge

## 🏷️ **Release Process**

### **Version Numbering:**
Vi følger [Semantic Versioning](https://semver.org/):
- `MAJOR.MINOR.PATCH` (e.g., 1.2.3)
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes

### **Release Steps:**
1. Update version i `plugin.json`
2. Update `CHANGELOG.md` med ændringer
3. Create git tag: `git tag v1.2.3`
4. Build release ZIP fil
5. Create GitHub Release med ZIP attachment

## 📞 **Community og Support**

### **Communication Channels:**
- **GitHub Issues**: Bug reports og feature requests
- **GitHub Discussions**: General diskussioner og spørgsmål
- **Email**: [Emil's email] for private henvendelser

### **Code of Conduct:**
- Vær venlig og respektful overfor alle bidragydere
- Konstruktiv feedback og kritik
- Hjælp nye bidragydere med at komme i gang
- Focus på tekniske løsninger frem for personlige meninger

## 🙏 **Anerkendelse**

Alle bidragydere vil blive krediteret i README filen og release notes. Tak for din tid og indsats i at gøre dette projekt bedre for hele 3D printing community!

---

**Happy Coding! 🎉**