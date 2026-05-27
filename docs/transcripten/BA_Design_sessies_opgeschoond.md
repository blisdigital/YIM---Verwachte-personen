# BA Design sessies — Verwachte Personen & AVG

| | |
|---|---|
| **Type** | Meeting / design review |
| **Datum** | 12 mei 2026, 08:00 |
| **Duur** | 1u 27m (transcriptie gestopt op 1:05:39) |
| **Deelnemers** | Kim van Olderen (designer, Blis), Kevin Rutten (designer, Blis), Maurice Vermaas (PO, Nsecure), Mariska Verheggen (Nsecure) |
| **Onderwerpen** | (1) AVG / zichtbaarheid gevoelige gegevens — designs Kevin; (2) Verwachte personen scherm — designs Kim |

> **Leeswijzer.** Het transcript is opgesplitst in twee inhoudelijke secties, conform de werkverdeling tijdens de sessie. Kevin presenteert eerst zijn AVG-concepten en verlaat de meeting rond 30 minuten (had tot 10:30 beschikbaar). Daarna gaat Kim verder met haar concept voor het Verwachte Personen scherm. Per sectie: informatie & inzichten, processen, feedback, en actiepunten.

---

## 1. AVG / Zichtbaarheid gevoelige gegevens — feedback voor Kevin

### 1.1 Context en uitgangspunten

Kevin werkt aan de "fietsentaak": **tonen en verbergen van gevoelige informatie** (BSN, ID-nummer, paspoortnummer, etc.) in YIM. Hij heeft een prototype met drie concepten gebouwd. Vooraf is er afstemming geweest met Jordan (developer); Kevin geeft aan dat Jordan onafhankelijk op hetzelfde idee uitkwam als zijn voorkeursconcept.

**Inzichten uit de discussie over de scope:**

- Het gaat **niet alleen om BSN**, maar om een bredere set: ID-nummer, paspoortnummer, AVG-documenten. Voor mensen buiten de EU ook het ID-bewijs. *(Maurice)*
- Er komt op termijn ook een **EU Digital Wallet** bij die invloed gaat hebben op welke gegevens getoond/verborgen worden. *(Maurice)*
- Het hangt sterk af van **rol en sector**:
  - In de verzekeringssector is BSN een normaal gegeven dat veel mensen mogen inzien vanwege de controlewerkzaamheden die ze uitvoeren.
  - Een gemiddelde aannemer zou BSN niet moeten kunnen zien.
  - Voor klantenservice-medewerkers die bellers helpen is BSN niet per se nodig.

> **Mariska:** "Het is niet een ongebruikelijk gegeven […], maar het is zeker niet zo dat iedereen dat meteen kan inzien."

**Gedeeld uitgangspunt (need-to-know principe):**

> **Mariska:** "Het is eigenlijk need-to-know, hè? Dus je moet het niet zien, tenzij je het nodig hebt om je werk te kunnen doen."

Maurice voegt hieraan toe: gegevens moeten **standaard afgeschermd** zijn, en zichtbaar maken vereist een **expliciete actie** (bijv. klikken op een oogje), zodat niemand er per ongeluk in meekijkt. "We gaan nu al naar een situatie dat je het steeds meer moet gaan afschermen."

### 1.2 De drie concepten van Kevin

Kevin presenteert van **meest interessant** naar **minst interessant** (zijn eigen voorkeursvolgorde):

**Concept A — Zichtbaarheidsprofielen (Kevins én Jordans voorkeur)**

- Naast gebruikersrollen wordt een apart concept "zichtbaarheidsprofiel" / "dataprofiel" geïntroduceerd.
- Een profiel heeft een naam, korte omschrijving en een set velden die dit profiel mag zien (in de demo 4 opties, kan uitgebreid worden).
- Profielen worden op een **andere plek** beheerd dan rollen (alleen admin), en aan rollen gekoppeld.
- **Voordeel:** wijziging op profielniveau werkt door naar alle gekoppelde rollen — geen onderhoud per rol.
- Kevin: bij YIM zijn er heel veel rollen die op elkaar gestapeld worden; als je per rol custom kunt bepalen welke gegevens zichtbaar zijn, "waar ga je dat dan nog controleren?"
- Kevin heeft ook een **bevestigingsscherm** voor de admin meegenomen: bij wijziging van een profiel zie je op welke gekoppelde rollen dit invloed heeft.

**Concept B — Per rol custom configureren**

- Binnen het bestaande gebruikersrol-formulier komt onderaan een blok "welke velden mag deze rol zien".
- Maurice gaf aan dat dit oorspronkelijk zijn eerste gedachte was (component onder bestandstoegang).
- **Voordeel:** alles in één rol, geen extra concept.
- **Nadeel:** bij 50 rollen moet je het 50× inrichten en onderhouden. Maurice: "Dat is dus daarvoor, ik voel daarvoor wel wat voor die zichtbaarheidsprofielen."

**Concept C — Gekoppeld aan ingevulde taken/acties in de rol**

- Op basis van wat in de rol is ingevuld (taken, acties), bepaalt het systeem automatisch welke velden zichtbaar zijn.
- Velden worden bijv. rood gemarkeerd als ze erg gevoelig zijn.
- **Voordeel:** sterke link tussen acties van een rol en de bijbehorende data; één rol toewijzen betekent automatisch de juiste dataset.
- **Nadeel:** geen mogelijkheid om dit op een centraal niveau te bewerken. Maurice: *"Dit niveau kan ik nergens bewerken […], dus dat hebben die andere twee wel echt in hun voordeel."*

### 1.3 Feedback en richting

- **Maurice's voorkeur: Concept A (zichtbaarheidsprofielen).** Argumenten: schaalbaarheid bij veel rollen, ontwikkelinspanning aan ontwikkelaarskant, beheersbaarheid. Wil het wel intern bespreken voordat het definitief is.
- **Concept C valt nagenoeg af** ("daar voel ik het minste voor"), maar Maurice wil hem niet meteen weghalen: *"Misschien kan het toch zijn dat we iets van inzage niveau eruit willen vissen dat we dat in één van de andere terug willen zien."* Alle drie concepten blijven dus voorlopig staan ter referentie.
- **Aandachtspunt voor verdere uitwerking:** goed groeperen welke velden onder welke categorie vallen. Anders kan iemand ondanks het juiste profiel toch een verkeerd gegeven zien. *(Kevin)*
- **Aandachtspunt categorisatie:** "bestanden" als categorie is te breed — onder bestanden vallen rijbewijs, POG, verschillende soorten certificaten. Mogelijk subcategorisering nodig. Hetzelfde geldt voor "ID" (paspoort, paspoortnummer, etc.). *(Kevin)*
- **Disclaimer Kim:** prototype is gebouwd met AI en wijkt visueel af van de huidige YIM-stijl. Maurice geeft aan dat de stijl wel moet aansluiten op huidig YIM, omdat het materiaal mogelijk met klanten gedeeld wordt. *(Dit punt wordt ook bij Kim's deel besproken.)*

### 1.4 Actiepunten — Kevin

| # | Actie | Eigenaar | Status |
|---|-------|----------|--------|
| 1.1 | Concept B en C laten staan in het prototype; gebruiker (Maurice) wil ze alle drie nog "beetpakken" voor interne afstemming | Kevin | Open |
| 1.2 | Categorisering van velden uitwerken — duidelijk maken welke specifieke velden/documenten onder welke categorie vallen (bestanden, ID, etc.), eventueel subcategorieën | Kevin | Open |
| 1.3 | Scope verbreden van alleen BSN naar volledige set gevoelige gegevens (ID-nummer, paspoortnummer, AVG-documenten, ID-bewijs voor non-EU) | Kevin | Open |
| 1.4 | Feedback van Maurice afwachten — Maurice komt begin volgende week terug na intern overleg | Maurice → Kevin | Open |
| 1.5 | Linkjes naar de drie prototypevarianten zijn in de chat gedeeld | Kevin | ✅ Gedaan |

---

## 2. Verwachte Personen scherm — feedback voor Kim

### 2.1 Stijl en visuele kaders

Het belangrijkste structurele feedbackpunt vooraf:

- Het huidige design (AI-prototype) wijkt **te ver af van de bestaande YIM-stijl**. Maurice wil het mockup wel met klanten kunnen delen, en wil voorkomen dat klanten denken dat heel YIM gaat veranderen.
- **Richting:** zoveel mogelijk de huidige YIM look-and-feel aanhouden. De grote redesign (incl. YIM-logo linksboven) komt later, maar "heeft nu niet de focus omdat er nog zoveel andere zaken op de rommel staan."
- **Front-end feedback:** als één pagina ineens een totaal ander design heeft, "krijg ik dat niet over de bühne" bij de front-end developers.
- **Jorian gaat ook nog feedback geven** (heeft veel klantcontact en kijkt vanuit configuratieperspectief).

### 2.2 Terminologie: aanmelden / afmelden i.p.v. check-in / check-out

**Geconstateerd probleem:** Engels en Nederlands door elkaar (bijv. "no show" naast Nederlandstalige labels).

**Voorstel Kim:** consequent Nederlands. "Check in/out" → "aanmelden/afmelden".

- Maurice: akkoord met aanmelden/afmelden.
- Mariska bevestigt: in de praktijk gebruikt bij andere bedrijven ("meld je aan bij de balie") — "check-in" is geen brede term.

**Vervolgvraag Kim:** moet de status dan ook mee veranderen? Bijv. "aangekomen" → "aangemeld"? Argumentatie:
- Sterkere feedbackloop voor de gebruiker: actie "aanmelden" → status "aangemeld" geeft directe bevestiging.
- Idem voor "vertrokken" → "afgemeld".

Maurice: eens. **Nuance:** niet iedere klant gebruikt expliciet een "aanmelden"-actie (zie hieronder bij Pas koppelen).

### 2.3 Aanmelden vs. pas koppelen — niet hetzelfde

Belangrijk inzicht dat tijdens de sessie ontstond:

- Maurice stelde eerst: *"op het moment dat iemand zijn pas gekoppeld is, is hij eigenlijk ook wel aangemeld."*
- Bij doordenken bleek dat dit **niet klopt**. Een receptie kan een stapel bezoekerspassen al vooraf klaarprinten/klaarleggen (Maurice noemt RAI als voorbeeld: 30 mensen verwacht, alle passen al uitgeprint). Op dat moment is de pas wel gekoppeld, maar de bezoeker is nog niet aangemeld.
- **Conclusie:** pas koppelen en aanmelden zijn **twee losse acties**.

**Variaties per klant (use cases):**

| Use case | Beschrijving |
|----------|--------------|
| Klant met toegangspassen | Bezoeker meldt zich, krijgt pas die tegen lezer moet → fysieke pas + activatie |
| Klant zonder toegangspassen (meelopen) | Bezoeker meldt zich, loopt met begeleider mee — alleen aanmelden, geen pas |
| Vooraf printen + later activeren | Klant (bijv. RAI) print passen vooraf voor verwachte bezoekers; activatie pas bij aankomst |
| NN-variant | Bezoekerspas wordt al gekoppeld vóór aankomst, maar pas **geactiveerd** bij aankomst |

> **Maurice:** "Daar moeten we wel flexibel in kunnen zijn om die verwarring weg te nemen."

**Implicatie voor de UI:** acties moeten zich aanpassen aan de configuratie van de klant. Als er geen inchecken/aanmelden bestaat bij een klant, wordt alleen "pas koppelen" getoond. Configuratie nodig.

### 2.4 Statussen en de no show-discussie

Kim vroeg of "no show" met reden + optionele opmerking de juiste invulling is.

**Tijdens de sessie ontstond consensus over een belangrijk onderscheid:**

| Status | Wanneer | Toelichting |
|--------|---------|-------------|
| Verwacht | Vanaf registratie tot aankomst | Default startstatus |
| Aangemeld | Na aanmelden bij balie | Vervangt "aangekomen"; sluit aan op actie |
| Pas gekoppeld | Wanneer pas (vooraf) gekoppeld is | Aparte status, kan onafhankelijk van aanmelding |
| **Nog niet aangemeld** | Geplande aankomsttijd is verstreken maar dag is nog niet voorbij | Persoon kán nog komen |
| **Niet aangemeld** | Aan het einde van de dag, persoon heeft zich niet gemeld | Definitieve afsluitende status |
| Afgemeld | Na uitcheck/inleveren pas | Vervangt "vertrokken" |

> **Mariska:** "De ene betekent: hij kan nog komen. En de andere betekent: ja."

**Waarom "niet aangemeld" en niet "no show":**

- Het bedrijf weet niet of de persoon écht niet is gekomen. Hij kan zich gewoon niet bij de balie gemeld hebben.
- Voorbeeld Mariska (NN-ervaring): gast parkeert, gastgever pakt hem op en ze gaan extern lunchen → pand nooit binnen, geen badge, maar wel "gekomen".
- Voorbeeld Maurice: Alliander heeft open terrein met receptie én vrij toegankelijke koffiehoek; iemand kan opgepikt worden zonder zich aan te melden.
- **Conclusie:** "no show" als term valt af. "Niet aangemeld" dekt de lading.

### 2.5 Automatisch afmelden / uitchecken

- Handmatig uitchecken is voor de meeste gebruikers onnodig en wordt "9 van de 10 keer vergeten."
- **Voorkeur:** afmelden gebeurt automatisch op het moment dat de pas wordt ingeleverd ("batchbox", "inleverbox", "inslikker") of via gekoppelde toegangssystemen.
- Pas inleveren → pas ontkoppelen → status op afgemeld. **Eén actie, geen twee losse stappen.**
- **Realtime?** AEOS (toegangscontrolesysteem) kan signaleren binnen ~1 minuut. Technisch koppeling tussen AEOS en YIM bestaat momenteel nog niet voor dit specifieke scenario. *(Maurice: "Dat staat wel in lijstje om mee te nemen, of initieel of als latere uitbreiding.")*

### 2.6 Tijden: aankomsttijd, eindtijd, parkeerregistratie

**Voor bezoekers:** start- en eindtijd worden geregistreerd. Eindtijd is op dit moment niet zichtbaar in het verwachte-personen scherm — Kim vroeg of dat erbij moet.

**Conclusie:** ja, **informatief tonen**. Niet als hard cut-off (afspraak kan uitlopen, iemand wil nog telefoneren in vergaderruimte), maar als context voor receptie:

> **Kim:** "Het is informatief inderdaad, want als jij als receptie moet nadenken over: het is nu 11 uur en hij zou om 10 uur komen en zijn afspraak eindigt om 12 uur — dan kan ik hem misschien wel al beschouwen als 'niet op komen dagen'."

**Voor contractors:** alleen begin- en einddatum, geen tijd. Maurice sluit niet uit dat tijdstippen ook hier in de toekomst nodig worden.

**Parkeerregistratie als signaal:**
- Een parkeerregistratie kan helpen om "niet aangemeld" te onderscheiden van "wel gekomen, niet bij balie". *(Mariska)*
- In de toekomst koppeling met parkeersysteem wenselijk (Maurice: nog niet met parkeersysteem 1, maar PWC is een mogelijk vroege use case).
- Bij NN nieuwbouw komt er een proces voor "bezoekers die niet aangemeld hoeven worden" — die hebben geen badge nodig maar wel een parkeerplek. *(Mariska)*

### 2.7 Parkeerplaats binnen verwachte-personen scherm?

Kim vroeg of een receptie ook een parkeerplaats moet kunnen vrijmaken vanuit dit scherm (bijv. bezoeker komt last-minute met OV).

**Conclusie:** **nee**, niet vanuit dit overzicht.

- Verwachte personen is het overzicht van de **receptie**, en de receptie is "niet de eerste die het weet."
- De **gastgever** is verantwoordelijk voor het bijwerken: parkeerautorisatie staat op het dossier van de persoon, daar moet je hem intrekken.
- Mariska deelt eigen ervaring (NN): bij carpoolen ging zij als gastgever zelf in haar overzicht de parkeerautorisatie eruit halen.
- Annuleren van de hele registratie kan wél vanuit het scherm — dan komt alles vrij, inclusief parkeerplek.

### 2.8 ID-check tijdens aanmelden

Kim's vraag: in sommige sectoren moet je je identiteitskaart laten zien bij aanmelding (Kim's eigen ervaring bij ProRail). Moet de receptionist daar proactief actie op kunnen ondernemen?

**Maurice:** "Heel goed idee."

- Visueel: een vinkje "ID gecontroleerd" zodat geregistreerd staat dat de actie is uitgevoerd.
- Soms wil de klant ook het ID-nummer of BSN-nummer (vanuit paspoort) **opvoeren** tijdens aanmelden (bekend uit AEOS).
- **Configureerbaar per klant:** alleen vinkje, vinkje + nummer opvoeren, of helemaal niet.
- **Disclaimer Mariska:** niet bij alle bedrijven verplicht. Soms is de gastgever verantwoordelijk voor identificatie.
- **Aandachtspunt:** bij **handmatig pas koppelen** wordt deze ID-check nu nog niet uitgevraagd, alleen bij de reguliere pasaanvraag. Mogelijk ook hier integreren.

### 2.9 Plaatsing van de actiekolom (sticky bij scrollen)

Kim heeft de acties **vooraan** geplaatst zodat ze direct bereikbaar zijn voor de receptie zonder horizontaal scrollen.

**Discussie:**

- Maurice: links is logisch (van links naar rechts lezen), maar wijkt af van de huidige YIM-stijl waar acties achteraan staan (rondje met 3 puntjes).
- Mariska oppert: rechts laten staan, maar **sticky** zodat de kolom in beeld blijft bij horizontaal scrollen.
- Maurice: ziet "absolute meerwaarde" van vooraan plaatsen.

**Conclusie:** Kim past de overige stijl meer richting huidige YIM aan, maar **behoudt deze nieuwe interactie** (actiekolom vooraan) voor dit scherm. Later eventueel ook op andere schermen toepassen.

### 2.10 Overige observaties uit de sessie

- **"Inslikker" / "batchbox" / "inleverbox"** — officiële term ontbreekt; in praktijk verschillende namen.
- **Bulk acties** zijn complex, mogelijk verschuiven naar fase 2. *(Maurice)*
- **Edge cases** zoals rokende bezoekers die telkens naar buiten en terug moeten met een nieuwe badge zijn klantkeuzes, "daar kunnen wij als Nsecure niks aan doen." *(Mariska)*

### 2.11 Actiepunten — Kim

| # | Actie | Eigenaar | Status |
|---|-------|----------|--------|
| 2.1 | Terminologie wijzigen: check-in/out → aanmelden/afmelden; statussen "aangekomen" → "aangemeld", "vertrokken" → "afgemeld" | Kim | Open |
| 2.2 | Statussen herzien: "no show" vervangen door tweeluik **nog niet aangemeld** (tijd verstreken, dag nog niet voorbij) + **niet aangemeld** (einde dag) | Kim | Open |
| 2.3 | Acties differentiëren naar klantconfiguratie: aanmelden, pas koppelen, pas activeren als losse, niet noodzakelijk gekoppelde acties | Kim | Open |
| 2.4 | Eindtijd van het bezoek toevoegen aan het overzicht (informatief, niet als harde cut-off) | Kim | Open |
| 2.5 | ID-check toevoegen aan aanmeldflow — als vinkje "ID gecontroleerd", configureerbaar per klant (alleen vinkje / vinkje + nummer opvoeren / niet) | Kim | Open |
| 2.6 | Parkeerplaats-aanpassing **niet** opnemen in dit scherm; verloopt via dossier/gastgever | Kim | ✅ Beslist |
| 2.7 | Algemene stijl meer richting huidige YIM look-and-feel brengen | Kim | Open |
| 2.8 | Actiekolom **vooraan houden** (behoud van Kim's nieuwe interactie) — niet sticky-achter zoals huidig YIM | Kim | ✅ Beslist |
| 2.9 | Diepere uitwerking van de flows ("flowtjes") — sessie inplannen, mogelijk om de week i.p.v. tweewekelijks | Kim | Open — afspraak 19e + 27e mei staat |
| 2.10 | Bulk acties uitwerken voor fase 2 | Kim / Maurice | Geparkeerd |
| 2.11 | Feedback van Jorian afwachten — Maurice filtert die eerst | Maurice → Kim | Open |
| 2.12 | Mockup heeft als disclaimer: huidige stijl wijkt af van YIM omdat het AI-prototype is — wordt in volgende iteratie verholpen (zie 2.7) | Kim | Open |

---

## Opmerkingen / onzekerheden

Het transcript bevat veel transcriptiefouten waar de namen van producten/systemen door automatische spraakherkenning slecht zijn weergegeven. Hieronder de interpretaties die ik heb toegepast:

- **"YIM" / "yim" / "Jim" / "iy m" / "ima" / "YM" / "yme"** → ik heb dit consequent geïnterpreteerd als **YIM** (het systeem in ontwikkeling). [interpretatie]
- **"AEOS" / "aeos" / "eos"** → onderliggend toegangscontrolesysteem. [interpretatie]
- **"jorian" / "Jordan" / "journ"** → **Jordan** voor de developer (door Kevin genoemd) en **Jorian** voor de medewerker met klantcontact (door Maurice genoemd). Het zijn vrijwel zeker **twee verschillende personen**. [interpretatie]
- **"Pauline"** → eenmaal genoemd, context onduidelijk (mogelijk projectleider/planning).
- **"Hillary"** → genoemd door Kim helemaal aan het begin ("Nee, niet voor Hillary") — context volledig onduidelijk. [onzeker]
- **"POG"** → certificaat-type, behouden zoals genoemd.
- **"unika" / "unicaat"** → mogelijk zustermerk/zusterbedrijf van Nsecure; eenmaal genoemd in smalltalk over datacenter-brand. [onzeker, niet relevant voor inhoud]
- **"sherpoint" / "sherpoint"** → vermoedelijk **SharePoint**, context: shared repo voor context-documenten.
- **"DESI ton wallet" / "desi ton wallet"** → vermoedelijk **EU Digital Identity Wallet** (EUDI Wallet). [interpretatie]
- De kleine smalltalk aan het begin (stroomuitval Almere, datacenter-brand, woonsituaties in Amersfoort/Houten) is volledig weggelaten omdat hij geen inhoudelijke relevantie heeft voor de twee onderwerpen.

Tot 1:05:39 was Kim aanwezig en stopte zij zelf de transcriptie omdat Maurice naar een ander overleg moest. De meeting volgens metadata duurde 1u 27m — de laatste ~22 minuten zijn dus niet getranscribeerd en niet onderdeel van deze opschoning.
