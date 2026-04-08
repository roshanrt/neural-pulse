import json

with open('n8n workflow.json', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix missing indentation before "type"
content = content.replace('"name": "Calculate Stats",\n"type"', '"name": "Calculate Stats",\n      "type"')

with open('n8n workflow.json', 'w', encoding='utf-8') as f:
    f.write(content)

print('✓ JSON fixed!')
