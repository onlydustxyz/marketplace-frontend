UPDATE project_details SET telegram_link = 'https://' || telegram_link WHERE telegram_link IS NOT NULL AND telegram_link != '' AND telegram_link NOT LIKE 'http%';
