# Fixes Applied - March 16, 2026

## Latest Updates

### 1. Filtered Amenities ✅
**Problem**: Too many amenities cluttering the property info section.

**Solution**: Reduced amenities to only the key features:
- **CCTV Surveillance** 📹 (Security)
- **EV Charging Station** 🔌 (Utilities)
- **Underground Water** 🚰 (Utilities)
- **Green Terrace** 🌱 (Outdoor)

### 2. Fixed Reset View on ESC Key ✅
**Problem**: Pressing ESC didn't reset camera to the default view shown in screenshot.

**Solution**:
- Fixed model loading to respect JSON `defaultCamera` setting
- Updated default camera position to `[40, 40, 40]` with target `[0, 30, 0]` for better building overview
- ESC key now properly resets to the default camera position

### 3. Fixed Green Terrace Hotspot Position ✅
**Problem**: Green Terrace hotspot was not positioned accurately on top of the building.

**Solution**:
- Updated position from `[0, 62, 0]` to `[0, 68, 0]` (higher on the rooftop)
- Updated navTarget to `[0, 68, 0]` for accurate camera positioning

### 4. Cleaned Up Clutter Information ✅
**Reduced nearby attractions** from 12 to 5 key locations:
- Bole International Airport
- Lycee G/Mariam International School
- Hyatt Regency
- National Museum of Ethiopia
- Friendship Park

**Reduced public facilities** from 7 to 4 categories:
- Healthcare (Hospitals)
- Education (Schools & Universities)
- Hospitality (Hotels & Restaurants)
- Commercial (Malls & Sport Facilities)

---

## Previous Fixes (Same Session)

### 5. Hotspot Mesh Naming ✅
- Meshes named `hotspot_*`, `hs_*`, or matching hotspot labels are auto-detected
- Selected hotspot meshes highlight with a pulsing effect

### 6. Smart Camera Positioning for Higher Floors ✅
- Fixed camera height calculation for units on higher floors
- Camera now properly accounts for unit elevation

### 7. Closer Unit View ✅
- Reduced camera distance from `1.8x` to `1.2x` building size
- Units appear closer and more detailed when selected

### 8. Escape Key Full Reset ✅
**ESC key now**:
- Closes all modals (gallery, floor plans, panorama, project details)
- Clears unit selection
- Clears hotspot selection
- Resets search filters
- Returns camera to default position

---

## Files Modified
- `tour-data.json` - Filtered amenities, features, nearby attractions, public facilities; fixed camera and hotspot positions
- `index.html` - Fixed camera reset logic, ESC key handler

## Testing Checklist
- [ ] Press ESC - camera should reset to show full building from distance
- [ ] Green Terrace hotspot should be positioned on top of the building
- [ ] Property info should show only 4 amenities (CCTV, EV Charging, Underground Water, Green Terrace)
- [ ] Project details modal should show reduced list of nearby attractions and facilities
