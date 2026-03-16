# Temer Properties Contact Integration

This directory contains the contact integration for **Temer Real Estate Ethiopia** integrated with the 3D Interactive Tour application.

## 📞 Contact Information

All contact data is sourced from the official Temer Properties website:
- **Source**: [Lycee Seken Project - Temer Real Estate Ethiopia](https://temerproperties.com/lycee-seken-project/)

### Primary Contact Details

| Type | Value | Display |
|------|-------|---------|
| **Hotline** | `6033` | 6033 |
| **Phone 1** | `+251975666699` | +251 975 666 699 |
| **Phone 2** | `+251939555558` | +251 939 555 558 |
| **Email** | `info@temerproperties.com` | info@temerproperties.com |
| **WhatsApp** | `+251939555558` | +251 939 555 558 |

### Social Media

- **Facebook**: [@temerproperties](https://www.facebook.com/temerproperties?mibextid=JRoKGi)
- **Twitter/X**: [@TemerProperties](https://x.com/TemerProperties)
- **YouTube**: [@TemerProperties](https://www.youtube.com/@TemerProperties)
- **Instagram**: [@temerproperties](https://www.instagram.com/temerproperties?igsh=MXJ6ZGozY3QwaXBsMQ)
- **TikTok**: [@temer_properties](https://www.tiktok.com/@temer_properties?_t=8opa5yBARtd&_r=1)

## 📁 Files

### 1. `contact-config.json`
Configuration file containing all contact information in JSON format.

**Usage:**
```javascript
fetch('contact-config.json')
  .then(res => res.json())
  .then(config => {
    console.log(config.contact.phones);
    console.log(config.contact.social);
  });
```

### 2. `contact-integration.js`
JavaScript module providing interactive contact functionality.

**Features:**
- 📞 Click-to-call phone numbers
- 💬 WhatsApp integration
- 📧 Email with pre-filled subject
- 📤 Web Share API integration
- 📝 Contact form with validation
- 🌐 Social media links
- 🎨 Beautiful modal UI with dark mode support

**Usage:**
```javascript
// Open contact modal
Contact.open();

// Direct actions
Contact.call('6033');
Contact.email();
Contact.whatsapp();
Contact.share();
```

### 3. `index.html` (Updated)
The main 3D tour application now includes:
- Updated contact buttons in project details with Temer Properties info
- Contact button in the header
- Integrated contact modal

## 🎨 UI Components

### Contact Modal
The contact modal includes:
- **Quick Actions**: Call, WhatsApp, Email, Share buttons
- **Phone Numbers**: All contact numbers with labels
- **Email**: Primary contact email
- **WhatsApp**: Direct chat link
- **Social Media**: All social platform links
- **Contact Form**: Name, Email, Phone, Message fields

### Project Details Contact Section
Each unit's detail panel includes direct contact buttons:
- 📱 Hotline (6033)
- 📱 Call (+251975666699)
- 💬 WhatsApp
- 📧 Email

## 🔧 Configuration

### Customizing Contact Information

Edit `contact-config.json` to update:
- Phone numbers
- Email addresses
- Social media links
- Business hours
- Location coordinates

### Styling

The contact modal uses CSS variables from the main application:
- Primary color: `#84a441` (Temer green)
- Secondary color: `#b09048` (Temer gold)

To customize colors, update `contact-config.json`:
```json
"displaySettings": {
  "primaryColor": "#84a441",
  "secondaryColor": "#b09048"
}
```

## 📱 WhatsApp Integration

WhatsApp messages are pre-configured with:
- **Number**: +251939555558
- **Default Message**: "Hello Temer Properties, I'm interested in learning more about your properties."

To customize the message, edit `contact-integration.js`:
```javascript
whatsapp: {
  message: "Your custom message here"
}
```

## 📧 Email Integration

Email links open with pre-filled:
- **To**: info@temerproperties.com
- **Subject**: "Inquiry about Temer Properties"
- **Body**: Template message

## 🌐 Web Share API

The share button uses the Web Share API when available:
- Shares project name and location
- Falls back to clipboard copy on unsupported browsers

## 📝 Contact Form

The contact form includes:
- Client-side validation
- Loading state during submission
- Success/error feedback

**Note**: The form currently logs to console. To enable actual submission:

1. Update the endpoint in `contact-config.json`:
```json
"contactForm": {
  "endpoint": "YOUR_API_ENDPOINT"
}
```

2. Update the `submitForm` method in `contact-integration.js` to call your API.

## 🎯 Integration Points

### In 3D Tour
1. **Header**: Contact button (top-left)
2. **Project Details**: Contact section in each unit panel
3. **Hotspot**: Contact information for amenities

### Direct Links
You can also use direct links anywhere:
```html
<!-- Call -->
<a href="tel:6033">📞 Call Hotline</a>

<!-- WhatsApp -->
<a href="https://wa.me/251939555558" target="_blank">💬 WhatsApp</a>

<!-- Email -->
<a href="mailto:info@temerproperties.com">📧 Email</a>
```

## 📊 Data Sources

All contact information extracted from:
- `/from website/Lycee Seken Project - Temer Real Estate Ethiopia.html`
- Lines 980-982, 1137-1145, 1992-2008, 2370 (HTML source)

## 🔒 Privacy & Compliance

- No personal data is stored locally
- Contact form submissions should comply with GDPR/local regulations
- WhatsApp uses official wa.me links
- Social media links open in new tabs with `rel="noopener"`

## 🐛 Troubleshooting

### Contact modal not opening
- Check browser console for errors
- Ensure `contact-integration.js` is loaded
- Verify `Contact.open()` is called after DOM is ready

### WhatsApp not working
- Ensure phone number is in international format
- Test on mobile device for best experience
- Check WhatsApp is installed on device

### Email not opening
- Default mail client must be configured
- Some browsers may block `mailto:` links

## 📞 Support

For technical support with the integration:
- Email: info@temerproperties.com
- Hotline: 6033

---

**Version**: 1.0.0  
**Last Updated**: March 16, 2026  
**Source**: Temer Properties Official Website
