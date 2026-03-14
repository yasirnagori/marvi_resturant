import re

images = {
    'bbq': 'https://plus.unsplash.com/premium_photo-1663955628549-9ee761a29202?auto=format&fit=crop&w=400&q=80',
    'karahi': 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=400&q=80',
    'marvi_roll': 'https://images.unsplash.com/photo-1626804475297-41604ea082eb?auto=format&fit=crop&w=400&q=80',
    'sandwich': 'https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg?auto=compress&cs=tinysrgb&w=400',
    'fried_chicken': 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6cb?auto=format&fit=crop&w=400&q=80',
    'burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
    'fries': 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=400&q=80',
    'pizza_pasta': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80',
    'extras': 'https://images.unsplash.com/photo-1514944288352-8f1819662b9a?auto=format&fit=crop&w=400&q=80',
    'colddrinks': 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80'
}

with open('src/data/menu.js', 'r', encoding='utf-8') as f:
    content = f.read()

# We need to find objects like { id: 1, name: '...', price: 360, categoryId: 'bbq' }
# and replace them with { id: 1, name: '...', price: 360, categoryId: 'bbq', image: 'url' }

def replacer(match):
    full_str = match.group(0)
    category = match.group(3)
    
    # Don't try to substitute if the item already has an image
    if 'image:' in full_str:
        return full_str
        
    img_url = images.get(category, 'https://placehold.co/400x400/FFFFFF/000000?text=Food')
    
    # We want to insert ', image: "url" ' right before the closing brace '}'
    # We can just replace '}' with `, image: '${img_url}' }`
    return full_str[:-1] + f", image: '{img_url}' " + "}"

# Regex for capturing the items.
pattern = r"(\{\s*id:\s*\d+,\s*name:\s*'[^']+',\s*price:\s*\d+,\s*categoryId:\s*'([^']+)'\s*\})"

# Wait, capture group 2 is the categoryId.
def strict_replacer(match):
    full_str = match.group(1)
    category = match.group(2)
    if 'image:' in full_str:
        return full_str
    img_url = images.get(category, 'https://placehold.co/400x400/FFFFFF/000000?text=Food')
    # strip trailing spaces and '}'
    clean_str = full_str.rstrip(' }')
    # sometimes there's no trailing space. just rstrip '}' then ' ' 
    clean_str = full_str.rstrip().rstrip('}')
    return clean_str + f", image: '{img_url}' }}"

# Let's try parsing line by line instead, much safer in JS
lines = content.split('\n')
out_lines = []
for line in lines:
    # If this is a menu item line and it doesn't have an image:
    if 'categoryId:' in line and 'id:' in line and 'image:' not in line:
        match = re.search(r"categoryId:\s*'([^']+)'", line)
        if match:
            category = match.group(1)
            img_url = images.get(category, 'https://placehold.co/400x400/FFFFFF/000000?text=Food')
            
            # replace the trailing ' },' or ' }'
            line = re.sub(r'(\s*\},?\s*)$', f", image: '{img_url}' \\1", line)
            
    out_lines.append(line)

with open('src/data/menu.js', 'w', encoding='utf-8') as f:
    f.write('\n'.join(out_lines))

print("Updated menu.js with images")
