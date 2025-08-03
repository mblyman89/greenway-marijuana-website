# Greenway Marijuana Website Sitemap

## Main Structure

### 1. Age Verification Gateway
- Age verification overlay (required before accessing any content)
- "Yes, I am 21+" button
- "No, I am not 21+" button (redirects to age restriction page)
- Remember verification option (cookie-based)

### 2. Home Page
- Hero banner with featured promotions
- Quick navigation to product categories
- Featured products section
- Daily deals and promotions
- Store information (hours, location)
- Newsletter signup
- Age verification reminder

### 3. Products
- **Main Categories:**
  - Flower
    - Indica
    - Sativa
    - Hybrid
    - Pre-ground
  - Pre-Rolls
    - Singles
    - Packs
    - Infused
  - Vaporizers
    - Cartridges
    - Disposables
    - Batteries
  - Concentrates
    - Wax
    - Shatter
    - Live Resin
    - Rosin
    - Diamonds
  - Edibles
    - Chocolates
    - Gummies
    - Beverages
    - Baked Goods
    - Capsules
  - Topicals
    - Creams
    - Balms
    - Patches
  - Accessories
    - Papers
    - Grinders
    - Glass
    - Storage
    - Vaporizers

### 4. Product Detail Pages
- Product images (multiple angles)
- Product name and brand
- Price and quantity options
- THC/CBD content
- Strain information (for applicable products)
- Effects and flavors
- Product description
- Lab test results
- Customer reviews
- Related products
- Add to cart functionality

### 5. Shopping Cart
- Cart summary
- Product list with images
- Quantity adjustments
- Remove item option
- Subtotal calculation
- Tax calculation
- Checkout button
- Continue shopping link

### 6. Checkout
- Order review
- Pickup location selection
- Pickup time selection
- Customer information form
- ID verification reminder
- Order confirmation
- Order tracking information

### 7. Deals & Promotions
- Current deals listing
- Daily specials
- Weekly promotions
- Holiday specials
- Bundle deals
- First-time customer offers

### 8. Loyalty Program
- Program benefits overview
- Points system explanation
- Registration form
- Member login
- Points balance display
- Available rewards
- Redemption instructions
- Terms and conditions

### 9. Blog
- Featured articles
- Category filters
  - Cannabis education
  - Product spotlights
  - Industry news
  - Health & wellness
  - Recipes
- Article search
- Archive by date
- Social sharing options
- Related articles

### 10. Newsletter
- Signup form
- Benefits overview
- Sample newsletter preview
- Frequency information
- Privacy policy link

### 11. About
- **Our Story**
  - Company history
  - Mission and values
  - Team information
  - Community involvement
- **Location & Hours**
  - Store address
  - Operating hours
  - Parking information
  - Map integration
  - Contact information
- **Careers**
  - Available positions
  - Application process
  - Employee benefits
  - Company culture

### 12. FAQ
- General questions
- Product information
- Ordering process
- Pickup instructions
- Payment options
- ID requirements
- Loyalty program
- Return policy

### 13. Contact
- Contact form
- Email address
- Phone number
- Store hours
- Location with map
- Social media links

### 14. Footer
- Quick links to main sections
- Social media icons
- Newsletter signup
- Copyright information
- Privacy policy
- Terms of service
- Age verification statement

## User Flows

### 1. Age Verification Flow
1. User visits website
2. Age verification overlay appears (blocks all content)
3. User is prompted to verify they are 21+ years old
   - YES option: Proceeds to homepage
   - NO option: Redirected to an age-restriction page
4. (Optional) Remember verification for X days using cookies/local storage

### 2. Shopping Flow
1. User navigates to Products section
2. User browses product categories or uses search/filter functionality
3. User selects a product to view details
4. On product detail page:
   - View product information (strain, THC/CBD content, effects, etc.)
   - View pricing
   - Select quantity
   - Add to cart
5. User continues shopping or proceeds to cart
6. In cart:
   - Review selected products
   - Adjust quantities
   - Remove items
   - Apply promotions/discounts
   - Proceed to checkout
7. Checkout process:
   - Select pickup location (Port Orchard store)
   - Select pickup time
   - Provide contact information
   - Review order
   - Submit order
8. Order confirmation:
   - Receive order number
   - Get estimated pickup time
   - Receive instructions for pickup

### 3. Loyalty Program Flow
1. User navigates to Loyalty Program section
2. New users:
   - View program benefits
   - Sign up form (name, email, phone, birthday)
   - Agree to terms
   - Submit registration
3. Existing users:
   - Login with phone number/email
   - View current points/rewards
   - See available promotions
   - View purchase history

### 4. Blog/Content Consumption Flow
1. User navigates to Blog section
2. Browse articles by category or date
3. Select article to read
4. Read article content
5. Related articles suggestions
6. Option to subscribe to newsletter

## Integration Points

### 1. CultiveraPOS Integration
- Inventory management
- Product information
- Pricing updates
- Order processing
- Customer management

### 2. Leafly Integration
- Product catalog synchronization
- Enhanced product information
- Brand catalog integration
- Product reviews and ratings

### 3. Weedmaps Integration
- Menu synchronization
- Online ordering
- Order status updates
- Customer notifications

### 4. Analytics Integration
- Google Analytics
- Conversion tracking
- User behavior analysis
- Campaign performance measurement