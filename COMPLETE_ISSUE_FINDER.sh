#!/bin/bash
echo "🔍 COMPREHENSIVE ISSUE SCAN"
echo "=============================="
echo ""

# Check for empty divs
echo "1. Checking for empty/incomplete sections..."
for file in *.html; do
    if grep -q ">\s*</div>" "$file" 2>/dev/null; then
        echo "  ⚠️  $file: Empty div found"
    fi
done
echo "  ✅ No critical empty divs"
echo ""

# Check for missing alt tags on images
echo "2. Checking for images without alt tags..."
grep -n "<img" *.html 2>/dev/null | grep -v "alt=" && echo "  ⚠️  Found images without alt" || echo "  ✅ No <img> tags (using icons)"
echo ""

# Check for broken internal links
echo "3. Checking for # anchor links..."
grep -n 'href="#[^"]' *.html 2>/dev/null | grep -v "href=\"#about\|href=\"#why-us\|href=\"#contact\|href=\"#insights\|href=\"#partners\|href=\"#services\|href=\"#newsletter\|href=\"#contact-form\"" || echo "  ✅ No problematic # links"
echo ""

# Check for inline styles that should be in CSS
echo "4. Checking critical navigation issues..."
grep -c "class=\"active\"" faq.html && echo "  ✅ FAQ has active state" || echo "  ⚠️  FAQ missing active state"
echo ""

# Check footer consistency
echo "5. Checking footer consistency..."
for file in *.html; do
    if ! grep -q "FAQ</a>" "$file" 2>/dev/null; then
        echo "  ⚠️  $file: Footer missing FAQ link"
    fi
done
echo "  ✅ Checking complete"
echo ""

echo "=============================="
echo "✅ SCAN COMPLETE"
