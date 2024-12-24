# FASE-1 Module Structure

This directory contains all the training modules for the FASE-1 platform.

## Directory Structure

```
modules/
├── template.html          # Base template for all module pages
├── cardiac/              # Cardiac emergency module
│   ├── images/           # Module-specific images
│   ├── videos/           # Module-specific videos
│   └── cardiac.html      # Module main page
├── trauma/               # Trauma response module
│   ├── images/
│   ├── videos/
│   └── trauma.html
└── basic-life-support/   # Basic life support module
    ├── images/
    ├── videos/
    └── basic-life-support.html
```

## Module Development Guidelines

1. Each module should:
   - Follow the template.html structure
   - Include proper data-module-id and data-section-id attributes
   - Implement all required sections (theory, practice, quiz)
   - Include appropriate media resources

2. Resource Guidelines:
   - Images: Use .jpg/.png format, optimized for web
   - Videos: Use .mp4 format, compressed appropriately
   - Keep resource files under 5MB when possible

3. Quiz Implementation:
   - Minimum 10 questions per module
   - Mix of multiple choice and true/false
   - Clear feedback for incorrect answers
   - 80% passing score requirement

4. Progress Tracking:
   - All sections must include proper tracking attributes
   - Prerequisites must be defined in moduleConfig.js
   - Progress saves automatically to localStorage

## Adding New Modules

1. Create new directory under modules/
2. Copy template.html as base
3. Update moduleConfig.js with new module data
4. Add required resources
5. Test all interactive elements
6. Verify progress tracking
7. Test prerequisites if any
