# Design System & Interaction Guidelines

## 1. Design Specification (设计规范)

### 1.1 Grid System (栅格系统)
We adopt an **8px Grid System** for consistent spacing and alignment. All spacing, margins, and paddings are multiples of 8px.

*   **Base Unit**: 8px
*   **Spacing Variables**:
    *   `--spacing-xs`: 8px
    *   `--spacing-sm`: 16px (2x)
    *   `--spacing-md`: 24px (3x)
    *   `--spacing-lg`: 32px (4x)
    *   `--spacing-xl`: 48px (6x)
    *   `--spacing-xxl`: 64px (8x)

### 1.2 Color Palette (色彩规范)
Colors are defined to ensure brand consistency and visual hierarchy.

*   **Primary Brand Color**:
    *   `--primary-gold`: `#d5bd7a` (Gold - Main accents, buttons, active states)
    *   `--primary-gold-hover`: `#e6d294` (Lighter Gold - Hover states)
*   **Backgrounds**:
    *   `--bg-dark`: `#050505` (Main background - Deep Black)
    *   `--bg-card`: `rgba(25, 25, 25, 0.9)` (Card background - Semi-transparent dark gray)
    *   `--bg-overlay`: `rgba(0, 0, 0, 0.7)` (Overlay for modals/hero images)
*   **Typography**:
    *   `--text-main`: `#f0f0f0` (Primary text - High contrast)
    *   `--text-muted`: `#b8b8b8` (Secondary text - Medium contrast)
*   **Borders**:
    *   `--border-color`: `rgba(213, 189, 122, 0.2)` (Subtle gold border)

### 1.3 Typography (字体排印)
*   **Font Family**: `'Helvetica Neue', Arial, sans-serif` (Clean, modern sans-serif)
*   **Hierarchy**:
    *   **H1/Hero**: Large, bold, tracking-wide for impact.
    *   **H2/Section Titles**: Distinct, often with gold accent.
    *   **H3/Card Titles**: Clear, readable.
    *   **Body**: Legible size (16px+), good line-height (1.6).

## 2. Functional Areas (功能区域划分)

### 2.1 Navigation Bar (顶部导航栏)
*   **Position**: Fixed at top (`position: fixed`).
*   **Style**: Dark semi-transparent background with backdrop blur (`backdrop-filter: blur(12px)`).
*   **Elements**: Logo (Left), Navigation Links (Right/Center), CTA Button (Far Right).
*   **Z-Index**: High (`1000`) to stay above content.

### 2.2 Main Content (主要内容区域)
*   **Layout**: Card-based layout using CSS Grid.
*   **Sections**:
    *   **Hero Section**: Full-width background image/video with centered text and CTA.
    *   **Features/Services**: Grid of cards displaying services.
    *   **Pricing**: Interactive tabbed pricing table.
    *   **Contact**: Information grid.

### 2.3 Footer (底部信息区域)
*   **Style**: Unified dark background, centered content.
*   **Content**: Copyright, social links, quick contact info.

## 3. Interaction Description (交互说明)

### 3.1 States (状态)
*   **Default**: Standard appearance.
*   **Hover**:
    *   **Buttons**: Background color lightens (`--primary-gold-hover`), slight transform (`translateY(-2px)`).
    *   **Cards**: Border color becomes brighter, slight shadow increase or lift effect.
    *   **Links**: Color change to Gold, underline or opacity change.
*   **Active/Pressed**: Button presses in slightly (`scale(0.98)`).
*   **Disabled**: Opacity reduced (0.5), cursor `not-allowed`.

### 3.2 Animations (动画)
*   **Transitions**: Smooth transitions (`0.3s ease`) on all interactive properties (color, background, transform).
*   **Entrance**: Elements fade in and slide up (`fadeInUp`) when scrolling into view (optional JS enhancement).
*   **Pulse**: Subtle pulse animation on primary CTA buttons to draw attention.

### 3.3 Form Controls (表单控件)
*   **Inputs**: Dark background, light text, gold border on focus (`outline: none`, `border-color: var(--primary-gold)`).
*   **Select/Tabs**:
    *   **Venue Selector**: Premium pill-shaped tabs with gradient backgrounds and backdrop blur.
    *   **Inactive**: Semi-transparent dark background, subtle gold border, dim text.
    *   **Hover**: Glow effect, brighter border, lift animation.
    *   **Active**: Gradient Gold background, dark text, shadow glow, slight scale up.

## 4. Responsive Strategy (响应式策略)

### 4.1 Breakpoints
*   **Mobile (< 768px)**:
    *   Grid: 1 column.
    *   Navigation: Hamburger menu (or simplified links).
    *   Padding: Reduced (`--spacing-sm`).
*   **Tablet (768px - 1024px)**:
    *   Grid: 2 columns.
    *   Padding: Medium (`--spacing-md`).
*   **Desktop (> 1024px)**:
    *   Grid: 3 or 4 columns (max-width constrained container).
    *   Padding: Large (`--spacing-lg`).

### 4.2 Fluid Typography & Layout
*   Use `max-width: 1200px` with `margin: 0 auto` for main container to prevent content from stretching too wide on large screens.
*   Images set to `width: 100%; height: auto;` to scale within containers.
