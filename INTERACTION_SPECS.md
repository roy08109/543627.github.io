# Interaction Specifications

## 1. General Principles
- **Feedback**: All interactive elements must provide immediate visual feedback on hover and active states.
- **Transitions**: Use smooth transitions (`0.3s cubic-bezier`) for all state changes.
- **Cursor**: Change cursor to `pointer` for all clickable elements.

## 2. Component Interactions

### Navigation Bar
- **State: Default**: Transparent background (or semi-transparent dark).
- **State: Hover (Link)**: Text color changes to Primary Blue (`#0ea5e9`).
- **State: Scroll**: Background becomes blurred (`backdrop-filter: blur(16px)`) with solid rgba color.

### Buttons (Primary/CTA)
- **State: Default**: Gradient background, shadow.
- **State: Hover**: 
  - Transform: `translateY(-2px)` (Lift effect).
  - Shadow: Increases to `0 8px 20px`.
  - Brightness: Slight increase.
- **State: Active**: Transform: `scale(0.98)` (Press effect).

### Feature Cards
- **State: Default**: Semi-transparent background, subtle border.
- **State: Hover**:
  - Transform: `translateY(-8px)`.
  - Border: Glows with Primary Blue (`rgba(56, 189, 248, 0.3)`).
  - Shadow: Expands to `0 20px 40px`.
  - Icon: Scale/Rotate subtle animation.
  - Background: Radial gradient overlay fades in.

### Slideshow
- **Auto-play**: Slides transition every 5 seconds.
- **Navigation**:
  - Arrows: Show on hover or always visible. Hovering arrow changes background to Primary Blue.
  - Dots: Indicate active slide. Click to jump. Active dot expands width (8px -> 24px).
- **Caption**: Text has a subtle fade-in animation when slide becomes active.

### Fee Table (Venue Selector)
- **Selection**: Clicking a venue button updates the table content immediately without page reload.
- **Active State**: Selected button has Primary Blue background and white text.
- **Inactive State**: Transparent background, grey text, border only.
- **Hover**: Inactive buttons show Primary Blue border and text on hover.

### Form Elements (Reservation)
- **Focus**: Input fields glow with Primary Blue border.
- **Validation**: Error states show Red border and shake animation.

## 3. Responsive Behavior

### Mobile (< 768px)
- **Navigation**: Collapses into a Hamburger menu (or simplified links).
- **Grid**: Collapses to 1 column.
- **Typography**: Hero title scales down to `36px`.
- **Padding**: Reduced to `16px` on sides.
