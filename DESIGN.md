# Golden Hypermarket Pala — Design System & Visual Specification (DESIGN.md)

This document is the single source of truth for all visual design tokens, layout rules, component styles, and responsive behaviors across the Golden Hypermarket Pala web application.

> **Design Directive**: Every future component, template, and style change must strictly adhere to the tokens and rules in this document and must not alter unrelated components.

---

## 1. Brand Identity & Visual Theme
- **Heritage**: Golden Hypermarket, Pala, Kerala — Est. 1964.
- **Inspiration**: Retail layout, density, and hover interactions modeled after Lulu Hypermarket UAE/GCC (`gcc.luluhypermarket.com/en-ae`), localized for Pala and Central Travancore with authentic Malayalam typography and regional colors.
- **Palette Essence**: Emerald Forest Green (Kerala's high ranges) + Warm Harvest Gold (festive celebration & premium quality) + Crisp White & Slate surfaces + Signal Red (hot deals).

---

## 2. Colour System (Tokens & Variables)

### 2.1 Brand Primary (Emerald Green)
| Token | Hex / Value | Role & Usage |
| :--- | :--- | :--- |
| `--primary-green` | `#0b4633` | Primary brand color, header bar, buttons, active chips, icons |
| `--primary-green-dark` | `#062a1d` | Top utility bar, hero gradients, primary headings, dark contrast |
| `--primary-green-light` | `#126348` | Interactive button hover, secondary accents, active highlights |
| `--primary-green-subtle` | `#e8f3ee` | Light tint backgrounds, hover pill states, badge backgrounds |

### 2.2 Brand Accent (Royal Harvest Gold)
| Token | Hex / Value | Role & Usage |
| :--- | :--- | :--- |
| `--gold-primary` / `--gold-main` | `#d49b28` | Search action button, stars, active borders, key highlights |
| `--gold-light` | `#f7c948` | Gradient start, icon accents, button hover transitions |
| `--gold-bright` | `#f5b82e` / `#ffd269` | Coupon chips, deals tags, luminous icon badges |
| `--gold-dark` | `#996e14` | Subheadings, text accents on light backgrounds |
| `--gold-subtle` | `#fff8e7` | Soft golden pill tags, promo banner backgrounds |
| `--gold-gradient` | `linear-gradient(135deg, #f7c948 0%, #d49b28 50%, #b37e1b 100%)` | Main search button CTA, premium promotional banners |
| `--gold-gradient-subtle` | `linear-gradient(135deg, rgba(247, 201, 72, 0.15) 0%, rgba(212, 155, 40, 0.08) 100%)` | Hero badges, card accent highlights |

### 2.3 Deals, Badges & Feedback
| Token | Hex / Value | Role & Usage |
| :--- | :--- | :--- |
| `--deal-red` | `#e53935` | Discount percentage tags (`20% OFF`), Hot Deals badges, price drop tags |
| `--deal-red-light` | `#ffebee` | Background for discount chips and stock alerts |
| `--accent-orange` | `#ff6b00` | Secondary promotional badges and warning chips |
| `--badge-whatsapp` | `#25d366` | WhatsApp order button and floating contact icon |
| `--alert-warning` | `#f59e0b` | Department Not Found icons, warning banners |
| `--alert-warning-bg` | `rgba(239, 68, 68, 0.2)` | Not found alert chip background |

### 2.4 Neutral Surfaces & Typography
| Token | Hex / Value | Role & Usage |
| :--- | :--- | :--- |
| `--bg-page` | `#f5f7f5` | Page body background (clean, soft cool-warm gray) |
| `--bg-card` | `#ffffff` | Pure white background for product cards, modals, and mega menu |
| `--bg-subtle` | `#f8fafc` | Mega-menu left pane, sidebar background, table headers |
| `--bg-hover` | `#f1f5f9` | Dropdown hover item, mobile trigger background |
| `--text-main` | `#1e293b` | Slate-800: primary headings, product names, price values |
| `--text-muted` | `#64748b` | Slate-500: product weights, descriptions, helper text, breadcrumbs |
| `--text-light` | `#94a3b8` | Slate-400: placeholders, empty state icons, borders |
| `--border-light` | `#e2e8f0` | Standard card borders, search bar outline, dividers |
| `--border-subtle` | `#edf2f7` | Soft horizontal rules, subtle list separators |
| `--border-dark` | `rgba(255, 255, 255, 0.2)` | Utility bar dividers and header borders |

---

## 3. Typography Hierarchy

### 3.1 Font Families
- **Primary Interface**: `'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
  - Weights: `400` (Regular), `500` (Medium), `600` (SemiBold), `700` (Bold).
  - Used for body copy, product cards, pricing, navigation, form inputs, buttons.
- **Display Headings**: `'Outfit', sans-serif`
  - Weights: `700` (Bold), `800` (ExtraBold).
  - Used for hero banner titles, category headings, section titles (`Weekly Deals`, `Fresh Produce`).
- **Malayalam Localization**: `'Manjari', 'Plus Jakarta Sans', sans-serif`
  - Weights: `400` (Regular), `700` (Bold).
  - Applied via `.lang-malayalam`, `.ml-font`, or inline subtitles (e.g. `പലചരക്ക് സാധനങ്ങൾ`).

### 3.2 Scale & Line Heights
| Level | Font Size | Weight | Line Height | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Title (H1)** | `2.2rem` - `2.5rem` (35–40px) | `800` | `1.2` | Hero banner title on home and category pages |
| **Section Title (H2)** | `1.7rem` - `1.85rem` (27–30px) | `800` | `1.25` | Section carousel titles, "Frequently Bought Together" |
| **Subsection (H3)** | `1.1rem` - `1.25rem` (18–20px) | `700` | `1.3` | Filter sidebar headers, mega menu department titles |
| **Group Title (H4)** | `0.92rem` - `1.05rem` (15–17px) | `700` | `1.35` | Filter group headings (`Price Range`, `Brands`, `Ratings`) |
| **Body Primary** | `0.95rem` - `1rem` (15–16px) | `400` / `500` | `1.6` | Product description, quality promise box, modal descriptions |
| **Card Product Title** | `0.95rem` (15px) | `600` | `1.35` | Two-line clamped product titles in cards |
| **Price (Current)** | `1.2rem` (19px) | `800` | `1.2` | Active price in Indian Rupees (`₹469`) |
| **Price (Old / Strikethrough)** | `0.85rem` (13.5px) | `500` | `1` | Muted strikethrough price (`₹560`) |
| **Meta / Small** | `0.8rem` - `0.85rem` (13px) | `500` / `600` | `1.4` | Weights (`1 kg Pack`), reviews count, subcategory chips |
| **Badges / Micro** | `0.72rem` - `0.75rem` (11.5–12px) | `800` | `1` | `20% OFF`, cart/wishlist counter pill, express tag |

---

## 4. Spacing System

Golden Hypermarket follows an 8-point structural grid with 4-point micro increments:

| Spacing Token | Pixels | Rem Equivalent | Primary Applications |
| :--- | :--- | :--- | :--- |
| `space-2xs` | `2px` | `0.125rem` | Icon offsets, subtle border shifts |
| `space-xs` | `4px` | `0.25rem` | Badge padding, micro tag gaps |
| `space-sm` | `8px` | `0.5rem` | Form control padding, chip gaps, small margins |
| `space-md` | `16px` | `1rem` | Card internal padding, toolbar spacing, search gaps |
| `space-lg` | `24px` | `1.5rem` | Filter sidebar padding, hero banner margins |
| `space-xl` | `32px` | `2rem` | Section gaps, catalog grid gutter |
| `space-2xl` | `48px` | `3rem` | Major page sections, footer margin |
| `space-3xl` | `64px` | `4rem` | Section vertical rhythm, bottom spacer |

- **Layout Max Width**: `1366px` (centered via `.container`).
- **Container Horizontal Padding**: `1.25rem` (`20px`) on desktop, `1rem` (`16px`) on mobile.

---

## 5. Border Radii

| Radius Token | Pixels | Application |
| :--- | :--- | :--- |
| `--radius-xs` | `4px` | Discount badge tags, input elements, tooltips |
| `--radius-sm` | `6px` | Action buttons, location selector, dropdown options |
| `--radius-md` | `10px` | Form inputs, stepper buttons, secondary cards |
| `--radius-lg` | `16px` | Product cards, filter sidebar, category hero banner |
| `--radius-xl` | `22px` | Promo banners, highlight cards |
| `--radius-full` | `9999px` | Pill buttons, subcategory chips, search bar container, circular tiles |

---

## 6. Shadows & Elevation

| Elevation Level | Value | Usage |
| :--- | :--- | :--- |
| `--shadow-sm` | `0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)` | Subtle input outline, quiet flat card |
| `--shadow-md` | `0 4px 12px -2px rgba(11, 70, 51, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)` | Default product card, search bar focus, sticky header |
| `--shadow-lg` | `0 12px 24px -4px rgba(11, 70, 51, 0.12), 0 4px 8px -2px rgba(0, 0, 0, 0.05)` | Mega menu dropdown, location modal dialog |
| `--shadow-hover` | `0 14px 28px rgba(11, 70, 51, 0.14)` | Hover lift state on product cards (`translateY(-4px)`) |
| `--shadow-gold` | `0 4px 16px rgba(212, 155, 40, 0.25)` | Primary gold search button and coupon chip glow |

---

## 7. Button Styles

### 7.1 Primary "Add to Cart" Button (`.btn-primary-add-cart`)
- **Background**: `var(--primary-green)` (`#0b4633`)
- **Color**: `#ffffff`
- **Font**: `'Plus Jakarta Sans'`, `0.9rem`, `weight: 700`
- **Padding**: `10px 18px` | **Height**: `40px`
- **Radius**: `var(--radius-md)` (`10px`)
- **Hover**: Background `var(--primary-green-light)` (`#126348`), `transform: translateY(-1px)`, `box-shadow: 0 4px 12px rgba(11, 70, 51, 0.2)`.

### 7.2 Gold Search Button (`.hdr-search-btn`)
- **Background**: `var(--gold-gradient)` (Gold to Amber gradient)
- **Color**: `var(--primary-green-dark)` (`#062a1d`)
- **Font**: `'Outfit'`, `0.95rem`, `weight: 700`
- **Padding**: `0 24px` | **Height**: `46px`
- **Border**: `none`
- **Radius**: `0 var(--radius-full) var(--radius-full) 0`

### 7.3 Quantity Stepper (`.qty-stepper`)
- **Dimensions**: Full card width, height `38px`
- **Background**: `var(--primary-green)`
- **Color**: `#ffffff`
- **Buttons**: `-` and `+` action buttons with hover brightness and tactile tap response.
- **Center**: Active quantity count with bold white text.

### 7.4 Subcategory Filter Chips (`.subcategory-chip`)
- **Default**: Background `var(--bg-card)`, border `1px solid var(--border-light)`, text `var(--text-main)`.
- **Active / Hover**: Background `var(--primary-green)`, border `1px solid var(--primary-green)`, text `#ffffff`, shadow `0 4px 10px rgba(11, 70, 51, 0.2)`.
- **Radius**: `var(--radius-full)`

### 7.5 Reset / Clear Button (`.clear-filters-btn`)
- **Background**: `transparent`
- **Color**: `var(--deal-red)` (`#e53935`)
- **Font**: `0.82rem`, `weight: 600`
- **Hover**: Text decoration underline.

---

## 8. Card Styles

### 8.1 Product Card (`.product-card`)
- **Surface**: `var(--bg-card)` (`#ffffff`)
- **Border**: `1px solid var(--border-light)` (`#e2e8f0`)
- **Radius**: `var(--radius-lg)` (`16px`)
- **Padding**: `1rem` (`16px`)
- **Hover State**:
  - `transform: translateY(-4px)`
  - `box-shadow: var(--shadow-hover)`
  - `border-color: rgba(11, 70, 51, 0.25)`
- **Image Container**: `aspect-ratio: 1 / 1`, background `transparent`, image `object-fit: contain`, subtle transition `transform 0.25s ease`.
- **Badges**:
  - Discount Tag: Absolute top `10px`, left `10px`, background `var(--deal-red)`, text `#fff`, `weight: 800`, `radius: 4px`.
  - Wishlist Heart: Absolute top `10px`, right `10px`, circle `32px`, background `rgba(255, 255, 255, 0.9)`, hover color `var(--deal-red)`.

### 8.2 Hero Category Banner (`.category-hero-banner`)
- **Surface**: `linear-gradient(135deg, var(--primary-green-dark), var(--primary-green))`
- **Glow**: Subtle radial golden glow overlay (`rgba(212, 155, 40, 0.25)`).
- **Radius**: `var(--radius-lg)` (`16px`)
- **Padding**: `2.5rem 3rem` (`40px 48px`)
- **Text Color**: `#ffffff`

### 8.3 2-Panel Mega Menu (`.hdr-mega-menu`)
- **Dimensions**: Width `780px`, absolute position beneath "All Categories" button.
- **Surface**: `#ffffff`, border `1px solid var(--border-light)`, shadow `0 16px 40px rgba(0, 0, 0, 0.18)`, radius `12px`.
- **Left Panel (`.hdr-mega-left-pane`)**: Width `280px`, background `var(--bg-subtle)` (`#f8fafc`), vertical scroll, department list with icons and chevrons.
  - Active button: Background `#ffffff`, color `var(--primary-green)`, left border `3px solid var(--gold-primary)`, `weight: 700`.
- **Right Panel (`.hdr-mega-right-pane`)**: Flex `1`, padding `1.5rem 1.75rem`, category heading with Malayalam translation, 2-column grid of subcategory pills with icons, and primary "Browse All [Department] →" button.

### 8.4 Friendly "Department Not Found" Card (`.category-not-found-card`)
- **Surface**: `#ffffff`
- **Border**: `1px dashed #cbd5e1`
- **Radius**: `12px`
- **Padding**: `48px 24px`
- **Features**: Amber store icon, clear explanation, direct pill buttons to all 10 departments, and primary return button.

---

## 9. Header Architecture & 3-Row Layout

1. **Row 1 (Top Utility Bar, Height: 38px)**:
   - Background: `var(--primary-green-dark)` (`#062a1d`).
   - Content: Delivery location picker, store hours (`8:00 AM - 10:00 PM`), express delivery tag, helpdesk phone, WhatsApp order link, language toggle (`മലയാളം / English`).
2. **Row 2 (Main Header, Height: 76px)**:
   - Sticky bar on scroll with glassmorphism or white card background.
   - Left: Golden Hypermarket logo with tagline (`SINCE 1964 • PALA, KERALA`).
   - Center: Single-row rounded search bar (max width `640px`, height `46px`) containing department dropdown, input, clear button, and gold search CTA.
   - Right: Account, Wishlist (badge counter), Cart (live subtotal + badge counter).
3. **Row 3 (Category Nav Bar, Height: 46px)**:
   - Background: `var(--primary-green)` (`#0b4633`) with gold underline.
   - Content: "All Categories" mega-menu trigger button + horizontal scrolling nav tabs for the 10 departments + "Weekend Deals" tab + "Pala Saver" coupon chip.

---

## 10. Code Standards & Enforcement

1. **No Inline Styles**: Never use `style="..."` attributes in HTML documents or JS template strings. All layout, colors, spacing, and typography must use designated classes in `css/style.css`.
2. **Single Stylesheet**: All styles reside in `css/style.css`. Do not split into separate component stylesheets unless requested.
3. **CSS Variable Usage**: Always use the canonical design variables (`var(--primary-green)`, `var(--gold-primary)`, `var(--text-main)`, `var(--radius-lg)`, etc.) instead of hardcoded hex values.
4. **Non-Regression Policy**: Changes to a specific page or component must never alter unrelated components or global resets without explicit instruction.
