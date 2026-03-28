-- =============================================
-- Seed: Sample wine data to get started
-- =============================================

insert into public.wines (name, winery, vintage, type, region, country, description, average_rating, rating_count, price_usd) values
  ('Opus One', 'Opus One Winery', 2019, 'red', 'Napa Valley', 'USA', 'A Bordeaux-style blend with cassis, dark cherry, and subtle cedar. Velvety tannins and an incredibly long finish.', 4.8, 1243, 385.00),
  ('Caymus Special Selection', 'Caymus Vineyards', 2021, 'red', 'Napa Valley', 'USA', 'Rich and full-bodied with dark fruit, mocha, and vanilla. Consistently one of California''s most celebrated Cabernets.', 4.7, 2105, 185.00),
  ('Cloudy Bay Sauvignon Blanc', 'Cloudy Bay', 2023, 'white', 'Marlborough', 'New Zealand', 'Iconic Kiwi Sauvignon Blanc. Crisp and bright with gooseberry, passionfruit, and fresh herbs.', 4.4, 5610, 28.00),
  ('Barolo DOCG', 'Giacomo Conterno', 2018, 'red', 'Piedmont', 'Italy', 'The king of Italian wines. Deep garnet with notes of dried roses, tar, cherries, and licorice. Extraordinary aging potential.', 4.9, 567, 220.00),
  ('Dom Pérignon', 'Moët & Chandon', 2015, 'sparkling', 'Champagne', 'France', 'Prestige Champagne at its finest. Toasty brioche, white peach, citrus zest, and exquisite mineral tension.', 4.9, 3892, 240.00),
  ('Whispering Angel Rosé', 'Château d''Esclans', 2023, 'rosé', 'Provence', 'France', 'The ultimate summer rosé. Pale salmon in color with strawberry, peach, and delicate floral notes. Perfectly refreshing.', 4.5, 8234, 32.00),
  ('Billecart-Salmon Brut Rosé', 'Billecart-Salmon', null, 'sparkling', 'Champagne', 'France', 'One of the most elegant rosé Champagnes. Fine bubbles, delicate red berry aromas, and a beautifully clean finish.', 4.7, 2108, 95.00),
  ('Stags'' Leap Artemis Cabernet', 'Stag''s Leap Wine Cellars', 2021, 'red', 'Napa Valley', 'USA', 'Silky and approachable with cherry, blackberry, and hints of coffee and vanilla. A benchmark Napa Cab.', 4.6, 3421, 65.00),
  ('Sancerre Blanc', 'Henri Bourgeois', 2022, 'white', 'Loire Valley', 'France', 'Classic Sancerre: crisp, mineral, and vibrant. White grapefruit, flint, and herbaceous notes. Pairs perfectly with oysters.', 4.4, 892, 38.00),
  ('Penfolds Grange', 'Penfolds', 2019, 'red', 'South Australia', 'Australia', 'Australia''s most iconic wine. A blend of Shiraz with incredible depth, complexity, and a decades-long aging potential.', 4.8, 412, 850.00),
  ('Kim Crawford Sauvignon Blanc', 'Kim Crawford', 2023, 'white', 'Marlborough', 'New Zealand', 'Light, zesty, and incredibly drinkable. Tropical fruits, citrus, and fresh herbs make this an everyday crowd-pleaser.', 4.2, 12450, 18.00),
  ('La Marca Prosecco', 'La Marca', null, 'sparkling', 'Veneto', 'Italy', 'Bright and bubbly with peach, cream, and honey flavors. Perfect for brunches, celebrations, or anytime bubbles are called for.', 4.1, 9876, 16.00),
  ('Meiomi Pinot Noir', 'Meiomi', 2022, 'red', 'California', 'USA', 'Smooth and fruit-forward with strawberry, blackberry, and mocha. One of America''s most popular Pinot Noirs.', 4.3, 18234, 20.00),
  ('Chalk Hill Chardonnay', 'Chalk Hill Estate', 2021, 'white', 'Sonoma Coast', 'USA', 'Elegant California Chardonnay with stone fruit, toasted oak, and a lush creamy texture. Old-World meets New-World style.', 4.5, 1234, 55.00),
  ('Veuve Clicquot Yellow Label', 'Veuve Clicquot', null, 'sparkling', 'Champagne', 'France', 'The iconic Yellow Label. Toasty and full-bodied with apple, pear, and brioche. A reliable, celebratory classic.', 4.6, 15678, 65.00);
