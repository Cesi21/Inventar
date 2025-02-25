Gre za enostavno spletno aplikacijo za upravljanje inventarja, ki vsebuje dva glavna dela:

Inventar (CRUD) del, kjer lahko uporabnik:

Gleda seznam vseh artiklov (ime, kategorija, firma, cena, količina …).
Dodaja nove artikle, ureja obstoječe in jih briše.
Chatbot del, ki z uporabo lokalnega LLM (ollama + deepseek r1 7B) odgovarja na vprašanja o inventarju, na primer:

“Ali imamo izdelek X na zalogi?”
“Koliko kosov je še na voljo?”
Celoten backend z bazo (npr. SQLite) in API-ji (za inventar in chatbot) teče na lokalnem strežniku, medtem ko je frontend narejen v Reactu in omogoča preprost vmesnik, dostopen z različnih naprav (desktop, mobilni brskalnik).