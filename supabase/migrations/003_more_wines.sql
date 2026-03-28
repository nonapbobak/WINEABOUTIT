-- 003_more_wines.sql
-- Expanded wine database: 80+ wines across all major regions and types

INSERT INTO wines (name, winery, vintage, type, region, country, description, avg_rating, price_min, price_max) VALUES

-- FRANCE - Bordeaux
('Château Margaux', 'Château Margaux', 2018, 'red', 'Margaux, Bordeaux', 'France', 'First Growth Bordeaux of extraordinary elegance. Silky tannins, violet and cassis aromas with a finish that lasts for minutes.', 4.9, 650, 900),
('Château Latour', 'Château Latour', 2015, 'red', 'Pauillac, Bordeaux', 'France', 'Powerful and structured First Growth with blackcurrant, cedar, and graphite. Built to age for decades.', 4.9, 700, 950),
('Château Mouton Rothschild', 'Château Mouton Rothschild', 2016, 'red', 'Pauillac, Bordeaux', 'France', 'Opulent First Growth known for its distinctive Pauillac character — cedar, tobacco, dark fruit, and unmistakable complexity.', 4.8, 600, 850),
('Château Haut-Brion', 'Château Haut-Brion', 2017, 'red', 'Pessac-Léognan, Bordeaux', 'France', 'The only First Growth outside the Médoc. Earthy, tobacco-laced with a silky texture and incredible length.', 4.8, 500, 750),
('Château Pétrus', 'Château Pétrus', 2015, 'red', 'Pomerol, Bordeaux', 'France', 'The world''s most legendary Merlot. Velvety, plush, with truffle, plum, and mocha on a monumental structure.', 5.0, 2500, 4000),
('Château Léoville Barton', 'Château Léoville Barton', 2018, 'red', 'Saint-Julien, Bordeaux', 'France', 'Classic Saint-Julien Second Growth. Cassis, pencil shavings, and fine-grained tannins with superb aging potential.', 4.5, 60, 90),
('Château Cos d''Estournel', 'Château Cos d''Estournel', 2016, 'red', 'Saint-Estèphe, Bordeaux', 'France', 'Exotic Second Growth with an Asian-inspired château. Rich dark fruit, spice, and powerful structure.', 4.7, 150, 250),
('Château Lynch-Bages', 'Château Lynch-Bages', 2019, 'red', 'Pauillac, Bordeaux', 'France', 'Fifth Growth that punches well above its classification. Concentrated blackcurrant, mint, and cigar box.', 4.6, 100, 160),

-- FRANCE - Burgundy
('Romanée-Conti', 'Domaine de la Romanée-Conti', 2018, 'red', 'Vosne-Romanée, Burgundy', 'France', 'The most coveted wine on earth. Ethereal Pinot Noir of unmatched complexity — rose, spice, earth, and silk.', 5.0, 15000, 25000),
('La Tâche', 'Domaine de la Romanée-Conti', 2017, 'red', 'Vosne-Romanée, Burgundy', 'France', 'Grand Cru monopole of profound depth. Red fruit, forest floor, and spice with DRC''s signature silky finish.', 4.9, 3000, 5000),
('Clos de Vougeot', 'Château de la Tour', 2019, 'red', 'Clos de Vougeot, Burgundy', 'France', 'Largest Grand Cru in Burgundy. Rich Pinot Noir with black cherry, game, and earthy complexity.', 4.6, 80, 150),
('Gevrey-Chambertin Premier Cru', 'Rossignol-Trapet', 2020, 'red', 'Gevrey-Chambertin, Burgundy', 'France', 'Powerful yet elegant Pinot Noir from the heart of Burgundy. Dark fruits, spice, and a firm mineral backbone.', 4.5, 70, 120),
('Puligny-Montrachet', 'Domaine Leflaive', 2020, 'white', 'Puligny-Montrachet, Burgundy', 'France', 'Benchmark white Burgundy from a legendary producer. Hazelnut, white flowers, and electric minerality.', 4.7, 120, 200),
('Meursault Perrières', 'Coche-Dury', 2019, 'white', 'Meursault, Burgundy', 'France', 'Premier Cru from Burgundy''s most celebrated white wine producer. Creamy, nutty, and intensely mineral.', 4.8, 400, 700),
('Chablis Grand Cru Les Clos', 'William Fèvre', 2020, 'white', 'Chablis, Burgundy', 'France', 'The finest expression of Chablis: steely, oyster-shell minerality with lemon curd and white peach.', 4.6, 80, 130),

-- FRANCE - Rhône
('Hermitage La Chapelle', 'Paul Jaboulet Aîné', 2015, 'red', 'Hermitage, Northern Rhône', 'France', 'Iconic Syrah from the iconic hill of Hermitage. Smoked meat, black olive, and dark berry with tremendous structure.', 4.7, 200, 350),
('Côte-Rôtie Landonne', 'E. Guigal', 2016, 'red', 'Côte-Rôtie, Northern Rhône', 'France', 'One of Guigal''s legendary "La La" wines. Massive Syrah with bacon fat, black pepper, and incredible concentration.', 4.8, 300, 500),
('Châteauneuf-du-Pape Château Rayas', 'Château Rayas', 2017, 'red', 'Châteauneuf-du-Pape, Southern Rhône', 'France', 'The most prized estate in Châteauneuf-du-Pape. 100% Grenache of ethereal elegance — red berries, garrigue, and silk.', 4.8, 350, 600),
('Condrieu', 'Yves Cuilleron', 2021, 'white', 'Condrieu, Northern Rhône', 'France', '100% Viognier of intoxicating perfume. Peach blossom, apricot, and honeysuckle with a lush, rich palate.', 4.5, 50, 80),

-- FRANCE - Champagne & Alsace
('Krug Grande Cuvée', 'Krug', NULL, 'sparkling', 'Champagne', 'France', 'The prestige non-vintage Champagne. A blend of 120+ wines across 10+ years — brioche, hazelnut, and toasted citrus.', 4.8, 200, 280),
('Billecart-Salmon Blanc de Blancs', 'Billecart-Salmon', 2012, 'sparkling', 'Champagne', 'France', 'Pure Chardonnay Champagne of pristine elegance. Chalk, lemon, and brioche with an impossibly fine mousse.', 4.7, 120, 180),
('Riesling Grand Cru Schlossberg', 'Domaine Weinbach', 2019, 'white', 'Alsace', 'France', 'Stunning dry Riesling from Alsace''s greatest Grand Cru. Lime zest, white peach, and explosive mineral finish.', 4.6, 45, 75),
('Gewurztraminer Vendanges Tardives', 'Trimbach', 2017, 'dessert', 'Alsace', 'France', 'Late harvest Gewurztraminer of intoxicating opulence. Rose petal, lychee, ginger, and honeyed sweetness.', 4.6, 60, 100),

-- ITALY
('Sassicaia', 'Tenuta San Guido', 2018, 'red', 'Bolgheri, Tuscany', 'Italy', 'The wine that created the Super Tuscans. Cabernet Sauvignon-led blend with cassis, pencil shavings, and Mediterranean herbs.', 4.8, 180, 280),
('Ornellaia', 'Ornellaia', 2017, 'red', 'Bolgheri, Tuscany', 'Italy', 'Bordeaux-style Super Tuscan of extraordinary polish. Plum, graphite, chocolate, and a velvet-smooth finish.', 4.8, 200, 320),
('Masseto', 'Masseto', 2016, 'red', 'Bolgheri, Tuscany', 'Italy', 'Italy''s answer to Pétrus. 100% Merlot of sumptuous depth — truffle, dark plum, coffee, and silky tannins.', 4.9, 500, 900),
('Brunello di Montalcino Biondi-Santi', 'Biondi-Santi', 2015, 'red', 'Montalcino, Tuscany', 'Italy', 'The original Brunello producer. Sangiovese of immense structure and longevity — cherry, leather, dried herbs, and iron.', 4.8, 300, 500),
('Barolo Cannubi', 'Marchesi di Barolo', 2017, 'red', 'Barolo, Piedmont', 'Italy', 'From Barolo''s most famous single vineyard. Nebbiolo with roses, tar, cherry, and firm, grippy tannins.', 4.7, 80, 140),
('Barbaresco Asili', 'Bruno Giacosa', 2016, 'red', 'Barbaresco, Piedmont', 'Italy', 'White label Barbaresco from a legendary producer. Elegant Nebbiolo with wild strawberry, rose, and dusty tannins.', 4.8, 200, 350),
('Amarone della Valpolicella', 'Dal Forno Romano', 2013, 'red', 'Valpolicella, Veneto', 'Italy', 'Intense dried-grape wine of extraordinary power. Dark cherry, chocolate, tobacco, and a warming, endless finish.', 4.8, 250, 400),
('Chianti Classico Gran Selezione', 'Antinori Tignanello', 2018, 'red', 'Chianti Classico, Tuscany', 'Italy', 'The wine that defined Super Tuscans. Sangiovese with Cabernet — cherry, violet, leather, and elegant oak spice.', 4.7, 100, 160),
('Soave Classico', 'Pieropan', 2022, 'white', 'Soave, Veneto', 'Italy', 'The benchmark Soave. Garganega grape with almond, white peach, and refreshing citrus minerality.', 4.3, 20, 35),
('Pinot Grigio', 'Jermann', 2022, 'white', 'Friuli, Italy', 'Italy', 'World-class Pinot Grigio from Friuli. Pear, apple blossom, and a clean, refreshing finish with real depth.', 4.4, 25, 40),
('Franciacorta Prestige', 'Ca'' del Bosco', NULL, 'sparkling', 'Franciacorta, Lombardy', 'Italy', 'Italy''s finest sparkling wine. Chardonnay-led with brioche, pear, and creamy bubbles rivaling Champagne.', 4.5, 40, 70),
('Vin Santo del Chianti', 'Isole e Olena', 2015, 'dessert', 'Tuscany', 'Italy', 'Tuscany''s treasured dessert wine. Dried apricot, walnut, caramel, and honey — rich and nutty with incredible concentration.', 4.6, 40, 65),

-- SPAIN
('Vega Sicilia Único', 'Vega Sicilia', 2011, 'red', 'Ribera del Duero', 'Spain', 'Spain''s most legendary wine. Tempranillo aged over 10 years — dried fruit, cedar, leather, and an eternal finish.', 4.9, 350, 600),
('Pingus', 'Dominio de Pingus', 2018, 'red', 'Ribera del Duero', 'Spain', 'Cult Tempranillo of massive depth and concentration. Black fruit, espresso, toast, and monumental structure.', 4.9, 700, 1200),
('La Rioja Alta Gran Reserva 904', 'La Rioja Alta', 2012, 'red', 'Rioja', 'Spain', 'Classic traditional Rioja Gran Reserva. Tempranillo with strawberry jam, vanilla, tobacco, and elegantly aged tannins.', 4.6, 50, 80),
('Muga Prado Enea Gran Reserva', 'Bodegas Muga', 2015, 'red', 'Rioja', 'Spain', 'Old-school Rioja with American oak aging. Red fruit, coconut, vanilla cream, and a silky, harmonious palate.', 4.6, 45, 75),
('Protos Gran Reserva', 'Protos', 2016, 'red', 'Ribera del Duero', 'Spain', 'Bold Tempranillo from one of Ribera del Duero''s oldest wineries. Dark plum, tobacco, and spice.', 4.4, 30, 50),
('Albariño Pazo de Señorans', 'Pazo de Señorans', 2022, 'white', 'Rías Baixas, Galicia', 'Spain', 'The benchmark Albariño. Peach, citrus blossom, and saline minerality — the perfect seafood wine.', 4.5, 25, 40),
('Cava Gran Reserva Brut Nature', 'Gramona', NULL, 'sparkling', 'Penedès, Catalonia', 'Spain', 'Premium Spanish sparkling wine aged 5+ years. Toasted almond, dried citrus peel, and bone-dry elegance.', 4.5, 35, 55),

-- GERMANY & AUSTRIA
('Riesling Auslese Mosel', 'Dr. Loosen', 2020, 'white', 'Mosel', 'Germany', 'Classic Mosel Riesling. Delicate sweetness balanced by razor-sharp acidity — peach, slate, and ethereal lightness.', 4.6, 35, 55),
('Riesling Trockenbeerenauslese', 'Egon Müller', 2018, 'dessert', 'Saar, Mosel', 'Germany', 'One of the world''s greatest dessert wines. Concentrated apricot, honey, and peach nectar with screaming acidity.', 5.0, 1500, 3000),
('Grüner Veltliner Smaragd', 'F.X. Pichler', 2020, 'white', 'Wachau', 'Austria', 'Austria''s greatest white grape at its best. White pepper, grapefruit, and a mineral backbone of steel.', 4.7, 60, 100),
('Blaufränkisch Mariental', 'Moric', 2019, 'red', 'Burgenland', 'Austria', 'Austria''s dark horse red. Wild cherry, pepper, and earthy minerals — Pinot Noir''s complex cousin.', 4.5, 40, 65),

-- USA - California
('Ridge Monte Bello', 'Ridge Vineyards', 2017, 'red', 'Santa Cruz Mountains, California', 'USA', 'California''s most Bordeaux-like Cabernet. Cedar, cassis, and mineral complexity that improves for 30+ years.', 4.8, 200, 300),
('Screaming Eagle', 'Screaming Eagle', 2018, 'red', 'Oakville, Napa Valley', 'USA', 'The cult Napa Cab. Impossibly concentrated blackcurrant, violet, and mocha with a finish of pure silk.', 5.0, 3000, 6000),
('Harlan Estate', 'Harlan Estate', 2016, 'red', 'Oakville, Napa Valley', 'USA', 'Proprietary Napa Bordeaux blend of epic proportions. Black cherry, dark chocolate, and cedar with stunning length.', 4.9, 900, 1500),
('Stag''s Leap Wine Cellars Cask 23', 'Stag''s Leap Wine Cellars', 2018, 'red', 'Stags Leap District, Napa Valley', 'USA', 'Legendary Napa Cab that beat Bordeaux in the Paris Tasting. Cassis, olive, and spice with elegant structure.', 4.7, 150, 220),
('Caymus Special Selection', 'Caymus Vineyards', 2019, 'red', 'Napa Valley', 'USA', 'Rich and opulent Napa Cabernet. Blackberry jam, vanilla, mocha, and velvety tannins — quintessential California style.', 4.6, 100, 150),
('Silver Oak Alexander Valley', 'Silver Oak', 2018, 'red', 'Alexander Valley, Sonoma', 'USA', 'Classic American oak-aged Cabernet. Vanilla, cherry cola, and coconut with a plush, accessible style.', 4.5, 65, 95),
('Jordan Cabernet Sauvignon', 'Jordan Vineyard', 2019, 'red', 'Alexander Valley, Sonoma', 'USA', 'Consistently excellent, food-friendly Cabernet. Plum, tobacco, and cedar with a refined, restrained style.', 4.4, 50, 70),
('Kistler Sonoma Mountain Chardonnay', 'Kistler Vineyards', 2020, 'white', 'Sonoma Mountain, Sonoma', 'USA', 'Benchmark California Chardonnay. Hazelnut, crème brûlée, and lemon curd with a creamy yet focused palate.', 4.7, 75, 120),
('Williams Selyem Pinot Noir', 'Williams Selyem', 2020, 'red', 'Russian River Valley, Sonoma', 'USA', 'Silky Russian River Pinot Noir. Strawberry, cola, spice, and forest floor — elegant and complex.', 4.6, 75, 110),
('Dominus', 'Dominus Estate', 2018, 'red', 'Yountville, Napa Valley', 'USA', 'Christian Moueix''s Napa estate. Old-world restraint in a California body — dark fruit, graphite, and structure.', 4.8, 200, 300),
('Duckhorn Merlot Three Palms', 'Duckhorn Vineyards', 2019, 'red', 'Napa Valley', 'USA', 'The wine that made American Merlot famous. Plum, mocha, and bay leaf — lush and food-versatile.', 4.6, 80, 120),
('Far Niente Chardonnay', 'Far Niente', 2021, 'white', 'Napa Valley', 'USA', 'Classic Napa Chardonnay with perfect balance. Pear, apple, butterscotch, and toasted oak — rich but focused.', 4.5, 65, 90),
('Stonestreet Cabernet Sauvignon', 'Stonestreet', 2018, 'red', 'Alexander Valley, Sonoma', 'USA', 'Mountain Cabernet from the Alexander Valley highlands. Dark fruit, anise, and volcanic mineral intensity.', 4.5, 55, 85),

-- USA - Oregon & Washington
('Adelsheim Elizabeth Pinot Noir', 'Adelsheim Vineyard', 2020, 'red', 'Willamette Valley, Oregon', 'USA', 'Elegant Willamette Pinot Noir from a pioneering Oregon producer. Cherry, earth, and cola with silky tannins.', 4.5, 45, 65),
('Cristom Marjorie Pinot Noir', 'Cristom Vineyards', 2020, 'red', 'Eola-Amity Hills, Oregon', 'USA', 'Biodynamic Oregon Pinot of great finesse. Wild strawberry, rose, forest floor, and a lingering mineral finish.', 4.6, 60, 90),
('Cayuse Camaspelo', 'Cayuse Vineyards', 2019, 'red', 'Walla Walla Valley, Washington', 'USA', 'Syrah-based cult blend from basalt soils. Bacon fat, blueberry, and cracked pepper — profound and complete.', 4.7, 150, 250),
('L''Ecole No. 41 Pepper Bridge', 'L''Ecole No. 41', 2018, 'red', 'Walla Walla Valley, Washington', 'USA', 'Single-vineyard Bordeaux blend from Walla Walla. Dark plum, cocoa, sage, and fine-grained tannins.', 4.5, 60, 90),

-- ARGENTINA & CHILE
('Catena Zapata Adrianna Vineyard', 'Catena Zapata', 2019, 'red', 'Mendoza', 'Argentina', 'Altitude-grown Malbec from Mendoza''s finest vineyard. Violet, blackberry, chocolate, and a fresh acidity.', 4.8, 180, 280),
('Achaval-Ferrer Quimera', 'Achaval-Ferrer', 2020, 'red', 'Mendoza', 'Argentina', 'Elegant Malbec-led blend from old-vine parcels. Ripe plum, lavender, and dark chocolate in a polished package.', 4.5, 35, 55),
('Zuccardi Valle de Uco', 'Zuccardi', 2021, 'red', 'Valle de Uco, Mendoza', 'Argentina', 'Award-winning Malbec from altitude vineyards. Fresh plum, violet, and mineral complexity with lively acidity.', 4.5, 25, 40),
('Almaviva', 'Almaviva', 2019, 'red', 'Maipo Valley', 'Chile', 'The Opus One of Chile — a Rothschild/Concha y Toro partnership. Cassis, tobacco, chocolate, and fine Andean structure.', 4.7, 120, 180),
('Don Melchor', 'Concha y Toro', 2019, 'red', 'Puente Alto, Maipo Valley', 'Chile', 'Chile''s flagship Cabernet. Dark fruit, eucalyptus, dark chocolate, and a powerful backbone with great aging potential.', 4.6, 65, 100),
('Casa Lapostolle Clos Apalta', 'Casa Lapostolle', 2019, 'red', 'Colchagua Valley', 'Chile', 'Consistently one of South America''s best. Carmenère-led blend with dark cherry, plum, and spice.', 4.6, 85, 130),

-- AUSTRALIA & NEW ZEALAND
('Penfolds Bin 707', 'Penfolds', 2018, 'red', 'South Australia', 'Australia', 'Penfolds'' flagship single-vineyard Cabernet. Blackcurrant, cedar, and trademark Australian warmth and generosity.', 4.7, 250, 400),
('Henschke Hill of Grace', 'Henschke', 2016, 'red', 'Eden Valley, South Australia', 'Australia', 'Australia''s most prized Shiraz from 160-year-old vines. Dark plum, anise, leather, and extraordinary persistence.', 4.9, 500, 900),
('Leeuwin Estate Art Series Chardonnay', 'Leeuwin Estate', 2019, 'white', 'Margaret River, Western Australia', 'Australia', 'Australia''s greatest Chardonnay. Melon, cashew, and citrus with a structure and longevity to rival Burgundy.', 4.7, 80, 130),
('Cloudy Bay Sauvignon Blanc', 'Cloudy Bay', 2023, 'white', 'Marlborough', 'New Zealand', 'The wine that put New Zealand on the map. Gooseberry, passionfruit, and freshly cut grass — a modern classic.', 4.3, 20, 35),
('Felton Road Bannockburn Pinot Noir', 'Felton Road', 2021, 'red', 'Central Otago', 'New Zealand', 'New Zealand''s finest Pinot Noir from the world''s southernmost wine region. Cherry, thyme, and pure mineral precision.', 4.7, 60, 95),
('Two Paddocks Pinot Noir', 'Two Paddocks', 2021, 'red', 'Central Otago', 'New Zealand', 'Actor Sam Neill''s acclaimed estate. Wild cherry, violet, and spice with a savory, earthy complexity.', 4.4, 45, 70),

-- SOUTH AFRICA & PORTUGAL
('Kanonkop Paul Sauer', 'Kanonkop', 2018, 'red', 'Stellenbosch', 'South Africa', 'South Africa''s finest Bordeaux blend. Pinotage and Cabernet with dark plum, spice, and velvety structure.', 4.6, 50, 80),
('Eben Sadie Columella', 'Sadie Family Wines', 2019, 'red', 'Swartland', 'South Africa', 'South Africa''s most cerebral red. Old-vine Syrah and Mourvèdre with dried herbs, olive, and stony minerality.', 4.7, 120, 180),
('Niepoort Vintage Port', 'Niepoort', 2017, 'fortified', 'Douro Valley', 'Portugal', 'Exceptional declared vintage from this boutique shipper. Chocolate, dried fig, and Douro minerality with 50-year potential.', 4.7, 80, 140),
('Graham''s Tawny 20 Year', 'W. & J. Graham''s', NULL, 'fortified', 'Douro Valley', 'Portugal', 'Classic aged Tawny Port. Walnut, orange peel, caramel, and dried apricot — nutty and endlessly complex.', 4.5, 40, 65),
('Quinta do Crasto Reserva', 'Quinta do Crasto', 2019, 'red', 'Douro Valley', 'Portugal', 'Old-vine Douro red from one of the valley''s most stunning estates. Dark fruit, schist minerals, and rustic charm.', 4.5, 30, 50)

ON CONFLICT (name, winery, vintage) DO NOTHING;
