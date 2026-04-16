// LexCampus — 100 Legal Maxims
const LEGAL_MAXIMS = [
  {
    id: 1,
    latin: "Audi alteram partem",
    english: "Hear the other side",
    meaning: "No person should be condemned unheard. Both parties must be given the opportunity to present their case before any decision is made.",
    area: "Natural Justice",
    tags: ["natural justice", "fair hearing", "procedural"]
  },
  {
    id: 2,
    latin: "Nemo iudex in causa sua",
    english: "No one should be a judge in his own cause",
    meaning: "A person should not be a judge in a case in which they have an interest. The rule against bias is a cornerstone of natural justice.",
    area: "Natural Justice",
    tags: ["bias", "natural justice", "impartiality"]
  },
  {
    id: 3,
    latin: "Res ipsa loquitur",
    english: "The thing speaks for itself",
    meaning: "A principle allowing negligence to be inferred from the very nature of an accident without direct evidence of how any defendant behaved.",
    area: "Tort Law",
    tags: ["negligence", "tort", "evidence"]
  },
  {
    id: 4,
    latin: "Pacta sunt servanda",
    english: "Agreements must be kept",
    meaning: "A foundational principle of contract law: every party must honour their contractual obligations. Treaties and agreements are binding.",
    area: "Contract Law",
    tags: ["contract", "agreement", "binding", "international law"]
  },
  {
    id: 5,
    latin: "Ignorantia juris non excusat",
    english: "Ignorance of the law excuses not",
    meaning: "A person who is unaware of a law may not escape liability for violating it merely because they were unaware of its content.",
    area: "Criminal Law",
    tags: ["ignorance", "criminal", "liability"]
  },
  {
    id: 6,
    latin: "Actus non facit reum nisi mens sit rea",
    english: "An act does not make a person guilty unless the mind is also guilty",
    meaning: "For a criminal offence to be established, a wrongful act (actus reus) must be accompanied by a guilty mind (mens rea).",
    area: "Criminal Law",
    tags: ["criminal", "mens rea", "actus reus", "guilt"]
  },
  {
    id: 7,
    latin: "In dubio pro reo",
    english: "When in doubt, for the accused",
    meaning: "When there is doubt, the benefit of the doubt must go to the accused. This underpins the presumption of innocence.",
    area: "Criminal Law",
    tags: ["doubt", "presumption of innocence", "criminal"]
  },
  {
    id: 8,
    latin: "Ei incumbit probatio qui dicit, non qui negat",
    english: "The burden of proof lies upon the one who affirms, not the one who denies",
    meaning: "The obligation of proving a fact rests on the party who asserts it exists, not on the party who denies it.",
    area: "Evidence",
    tags: ["burden of proof", "evidence", "affirmation"]
  },
  {
    id: 9,
    latin: "Nulla poena sine lege",
    english: "No punishment without law",
    meaning: "A person cannot be punished for an act that was not criminalised at the time it was committed. A protection against retroactive criminal laws.",
    area: "Criminal Law",
    tags: ["punishment", "legality", "criminal", "human rights"]
  },
  {
    id: 10,
    latin: "Ubi jus ibi remedium",
    english: "Where there is a right, there is a remedy",
    meaning: "Wherever the law gives a right, it also provides a remedy for the violation of that right.",
    area: "General Law",
    tags: ["remedy", "rights", "general"]
  },
  {
    id: 11,
    latin: "Volenti non fit injuria",
    english: "To one who consents, no injury is done",
    meaning: "A person who knowingly and voluntarily accepts a risk cannot later sue for damages arising from that risk.",
    area: "Tort Law",
    tags: ["consent", "tort", "defence", "voluntary assumption"]
  },
  {
    id: 12,
    latin: "Ex turpi causa non oritur actio",
    english: "From a dishonorable cause, no action arises",
    meaning: "A claimant cannot succeed in a legal action if it arises from their own illegal or immoral act.",
    area: "Contract / Tort Law",
    tags: ["illegality", "tort", "contract", "defence"]
  },
  {
    id: 13,
    latin: "Caveat emptor",
    english: "Let the buyer beware",
    meaning: "The principle that the buyer purchases at their own risk and must check the quality and suitability of goods before buying.",
    area: "Contract Law",
    tags: ["contract", "buyer", "risk", "sale of goods"]
  },
  {
    id: 14,
    latin: "Nemo dat quod non habet",
    english: "No one can give what they do not have",
    meaning: "A person cannot transfer a better title to property than they themselves possess.",
    area: "Property Law",
    tags: ["property", "title", "transfer", "ownership"]
  },
  {
    id: 15,
    latin: "Delegatus non potest delegare",
    english: "A delegate cannot delegate",
    meaning: "A person to whom powers or duties have been delegated may not further delegate those powers or duties to another without authority.",
    area: "Administrative Law",
    tags: ["delegation", "administrative", "authority"]
  },
  {
    id: 16,
    latin: "Lex prospicit, non respicit",
    english: "The law looks forward, not backward",
    meaning: "Laws are generally intended to operate prospectively and should not retroactively change the legal consequences of past acts.",
    area: "General Law",
    tags: ["retrospective", "legislation", "prospective"]
  },
  {
    id: 17,
    latin: "Salus populi suprema lex esto",
    english: "The welfare of the people shall be the supreme law",
    meaning: "The ultimate purpose of law is to serve the public good and the well-being of the community.",
    area: "Constitutional Law",
    tags: ["public policy", "constitutional", "welfare"]
  },
  {
    id: 18,
    latin: "In pari delicto potior est conditio defendentis",
    english: "Where both parties are equally at fault, the position of the defendant is the stronger",
    meaning: "When both parties are equally guilty, the law leaves them as it finds them — no relief will be granted to either.",
    area: "Contract Law",
    tags: ["illegality", "fault", "equity", "contract"]
  },
  {
    id: 19,
    latin: "Suppressio veri, suggestio falsi",
    english: "Suppression of the truth is equivalent to the suggestion of a falsehood",
    meaning: "Deliberately concealing a material fact is as wrongful as making a false statement.",
    area: "Contract / Equity",
    tags: ["misrepresentation", "fraud", "contract", "equity"]
  },
  {
    id: 20,
    latin: "Damnum sine injuria",
    english: "Damage without legal injury",
    meaning: "Loss suffered without violation of a legal right does not give rise to a cause of action.",
    area: "Tort Law",
    tags: ["damage", "tort", "legal right", "no cause of action"]
  },
  {
    id: 21,
    latin: "Injuria sine damno",
    english: "Injury without damage",
    meaning: "A violation of a legal right without actual damage. Actionable per se — no proof of damage needed.",
    area: "Tort Law",
    tags: ["tort", "actionable per se", "legal injury"]
  },
  {
    id: 22,
    latin: "Fraus omnia corrumpit",
    english: "Fraud corrupts everything",
    meaning: "Fraud vitiates everything it touches; no legal right or title can be founded upon a fraudulent act.",
    area: "General Law",
    tags: ["fraud", "void", "corruption", "equity"]
  },
  {
    id: 23,
    latin: "Qui facit per alium facit per se",
    english: "He who acts through another acts himself",
    meaning: "The principle of vicarious liability — a principal is liable for the acts of their agent done within the scope of authority.",
    area: "Agency / Employment Law",
    tags: ["agency", "vicarious liability", "employment", "principal"]
  },
  {
    id: 24,
    latin: "Lex loci contractus",
    english: "The law of the place of the contract",
    meaning: "A conflict of laws principle: a contract is governed by the law of the country where it was made.",
    area: "Private International Law",
    tags: ["conflict of laws", "contract", "jurisdiction"]
  },
  {
    id: 25,
    latin: "Stare decisis",
    english: "To stand by decisions",
    meaning: "Courts should follow the precedents established by earlier decisions, ensuring consistency and predictability in the law.",
    area: "Jurisprudence",
    tags: ["precedent", "case law", "doctrine", "courts"]
  },
  {
    id: 26,
    latin: "Obiter dictum",
    english: "A thing said by the way",
    meaning: "A remark made by a judge that is not essential to the decision and does not form part of the binding precedent.",
    area: "Jurisprudence",
    tags: ["precedent", "judgment", "courts", "obiter"]
  },
  {
    id: 27,
    latin: "Ratio decidendi",
    english: "The reason for the decision",
    meaning: "The legal principle or rule that forms the basis of a court's decision, which is binding on lower courts.",
    area: "Jurisprudence",
    tags: ["precedent", "ratio", "binding", "courts"]
  },
  {
    id: 28,
    latin: "Lex semper dabit remedium",
    english: "The law will always give a remedy",
    meaning: "The legal system will always provide a remedy where a right has been violated.",
    area: "General Law",
    tags: ["remedy", "rights", "general"]
  },
  {
    id: 29,
    latin: "Noscitur a sociis",
    english: "A word is known by the company it keeps",
    meaning: "A rule of statutory interpretation: the meaning of an ambiguous word should be determined by reference to the words surrounding it.",
    area: "Statutory Interpretation",
    tags: ["interpretation", "statute", "legislation"]
  },
  {
    id: 30,
    latin: "Ejusdem generis",
    english: "Of the same kind",
    meaning: "When general words follow specific words in a statute, the general words are interpreted to include only things of the same kind as the specific words.",
    area: "Statutory Interpretation",
    tags: ["interpretation", "statute", "legislation"]
  },
  {
    id: 31,
    latin: "Expressio unius est exclusio alterius",
    english: "The expression of one thing excludes others",
    meaning: "Where a statutory provision lists specific items, other items not on the list are deemed to be excluded.",
    area: "Statutory Interpretation",
    tags: ["interpretation", "statute", "exclusion"]
  },
  {
    id: 32,
    latin: "Dura lex sed lex",
    english: "The law is harsh, but it is the law",
    meaning: "Even if a legal rule leads to an unjust result in a particular case, it must still be applied as written.",
    area: "General Law",
    tags: ["rule of law", "justice", "general"]
  },
  {
    id: 33,
    latin: "Ex post facto",
    english: "After the fact",
    meaning: "Refers to laws that retroactively change the legal consequences of actions that were committed before the enactment of the law.",
    area: "Criminal Law",
    tags: ["retrospective", "criminal law", "legislation"]
  },
  {
    id: 34,
    latin: "Habeas corpus",
    english: "You shall have the body",
    meaning: "A writ requiring a person under arrest to be brought before a judge. It safeguards against unlawful and indefinite imprisonment.",
    area: "Constitutional / Human Rights Law",
    tags: ["liberty", "constitutional", "fundamental rights", "detention"]
  },
  {
    id: 35,
    latin: "In loco parentis",
    english: "In the place of a parent",
    meaning: "Describes a person or institution that acts in place of a parent regarding a child's welfare, discipline, and care.",
    area: "Family Law",
    tags: ["parent", "child", "family law", "guardian"]
  },
  {
    id: 36,
    latin: "Mens rea",
    english: "Guilty mind",
    meaning: "The mental element of a crime. The intention or knowledge of wrongdoing that constitutes part of a crime.",
    area: "Criminal Law",
    tags: ["criminal", "intention", "mental element"]
  },
  {
    id: 37,
    latin: "Actus reus",
    english: "Guilty act",
    meaning: "The physical element of a crime — the wrongful act or omission that constitutes the external part of a criminal offence.",
    area: "Criminal Law",
    tags: ["criminal", "act", "omission", "element of offence"]
  },
  {
    id: 38,
    latin: "Consensus ad idem",
    english: "Agreement on the same thing",
    meaning: "A meeting of minds — both parties to a contract must have agreed upon the same thing at the same time.",
    area: "Contract Law",
    tags: ["contract", "offer", "acceptance", "agreement"]
  },
  {
    id: 39,
    latin: "Quid pro quo",
    english: "Something for something",
    meaning: "Consideration in contract law; each party must give something of value in exchange for what they receive.",
    area: "Contract Law",
    tags: ["contract", "consideration", "exchange"]
  },
  {
    id: 40,
    latin: "In absentia",
    english: "In the absence of",
    meaning: "Proceedings that take place in the absence of one of the parties involved.",
    area: "Procedural Law",
    tags: ["procedure", "trial", "absence"]
  },
  {
    id: 41,
    latin: "Locus standi",
    english: "Place of standing",
    meaning: "The right or capacity to bring an action or to appear in a court. A party must have sufficient interest in a matter to have standing.",
    area: "Procedural Law",
    tags: ["standing", "procedure", "access to court"]
  },
  {
    id: 42,
    latin: "Amicus curiae",
    english: "Friend of the court",
    meaning: "An impartial adviser, often voluntary, to a court of law in a particular case, who is not a party to the case.",
    area: "Procedural Law",
    tags: ["court", "adviser", "procedure", "third party"]
  },
  {
    id: 43,
    latin: "Sub judice",
    english: "Under a judge / Under consideration",
    meaning: "A matter that is currently being considered by a court of law and may not be openly discussed elsewhere to prevent prejudice.",
    area: "Procedural Law",
    tags: ["procedure", "contempt", "court proceedings"]
  },
  {
    id: 44,
    latin: "Functus officio",
    english: "Having discharged his duty",
    meaning: "A doctrine by which a public officer or arbitrator, having fulfilled their duty, has no further authority to act in that matter.",
    area: "Administrative / Arbitration Law",
    tags: ["administrative", "arbitration", "finality", "authority"]
  },
  {
    id: 45,
    latin: "Ultra vires",
    english: "Beyond the powers",
    meaning: "An act which is beyond the legal power or authority of the person or organisation that has taken it.",
    area: "Administrative / Company Law",
    tags: ["administrative", "company law", "authority", "powers"]
  },
  {
    id: 46,
    latin: "Intra vires",
    english: "Within the powers",
    meaning: "An act that is within the scope of legal power or authority of the person or body performing it.",
    area: "Administrative / Company Law",
    tags: ["administrative", "company law", "authority", "powers"]
  },
  {
    id: 47,
    latin: "Certiorari",
    english: "To be certified / To be made certain",
    meaning: "An order from a superior court calling up the records of a lower court or tribunal to review the legality of a decision.",
    area: "Administrative Law",
    tags: ["judicial review", "administrative", "certiorari", "writ"]
  },
  {
    id: 48,
    latin: "Mandamus",
    english: "We command",
    meaning: "A writ issued by a superior court commanding a lower court, tribunal, or public authority to perform a specific duty.",
    area: "Administrative Law",
    tags: ["judicial review", "writ", "administrative", "duty"]
  },
  {
    id: 49,
    latin: "Prohibition",
    english: "A writ to prevent action",
    meaning: "A writ from a superior court to a lower court or tribunal directing it to stop proceedings in a matter outside its jurisdiction.",
    area: "Administrative Law",
    tags: ["judicial review", "writ", "jurisdiction", "administrative"]
  },
  {
    id: 50,
    latin: "Quo warranto",
    english: "By what authority",
    meaning: "A writ requiring a person to show by what authority they hold a public office or exercise a public franchise.",
    area: "Administrative / Constitutional Law",
    tags: ["authority", "office", "constitutional", "writ"]
  },
  {
    id: 51,
    latin: "Lex posterior derogat priori",
    english: "A later law repeals an earlier one",
    meaning: "When two laws conflict, the later law prevails over the earlier one.",
    area: "Statutory Interpretation",
    tags: ["statutes", "repeal", "interpretation", "legislation"]
  },
  {
    id: 52,
    latin: "Generalia specialibus non derogant",
    english: "General things do not derogate from special things",
    meaning: "Where a general provision and a specific provision conflict, the specific provision will prevail.",
    area: "Statutory Interpretation",
    tags: ["interpretation", "statutes", "specific vs general"]
  },
  {
    id: 53,
    latin: "Cessante ratione legis, cessat ipsa lex",
    english: "When the reason for the law ceases, the law itself ceases",
    meaning: "A law should not apply when the purpose for which it was enacted no longer exists.",
    area: "Jurisprudence",
    tags: ["purpose", "interpretation", "ratio", "jurisprudence"]
  },
  {
    id: 54,
    latin: "Nemo debet bis vexari pro una et eadem causa",
    english: "No one ought to be tried twice for the same cause",
    meaning: "The doctrine against double jeopardy: a person acquitted or convicted of a crime should not be tried again for the same offence.",
    area: "Criminal Law",
    tags: ["double jeopardy", "criminal", "finality", "autrefois"]
  },
  {
    id: 55,
    latin: "Pro bono publico",
    english: "For the public good",
    meaning: "Work undertaken voluntarily and without payment — typically legal services provided free of charge to those unable to afford them.",
    area: "Legal Ethics",
    tags: ["public interest", "pro bono", "ethics", "access to justice"]
  },
  {
    id: 56,
    latin: "Cuius est solum, eius est usque ad coelum et ad inferos",
    english: "Whoever owns the soil, owns to the heavens and to the depths",
    meaning: "A property law maxim stating that ownership of land extends upward to the sky and downward to the earth's core.",
    area: "Property Law",
    tags: ["property", "land", "ownership", "real property"]
  },
  {
    id: 57,
    latin: "In flagrante delicto",
    english: "Caught in the act of committing the offence",
    meaning: "The situation of a person who is caught in the very act of committing a crime.",
    area: "Criminal Law",
    tags: ["criminal", "arrest", "evidence", "caught"]
  },
  {
    id: 58,
    latin: "De minimis non curat lex",
    english: "The law does not concern itself with trifles",
    meaning: "Courts will not resolve disputes over matters too trivial or minor to merit attention.",
    area: "General Law",
    tags: ["triviality", "general", "courts", "de minimis"]
  },
  {
    id: 59,
    latin: "Inter partes",
    english: "Between the parties",
    meaning: "Refers to proceedings or matters that concern and bind only the parties involved, rather than the world at large.",
    area: "Procedural Law",
    tags: ["parties", "binding", "procedure"]
  },
  {
    id: 60,
    latin: "Erga omnes",
    english: "Towards all",
    meaning: "Obligations that are binding on all states or all persons, as a matter of international or public law.",
    area: "International Law",
    tags: ["international", "obligations", "all parties"]
  },
  {
    id: 61,
    latin: "Bona fide",
    english: "In good faith",
    meaning: "Genuine, real, without fraud or deception. A bona fide purchaser acquires property honestly without notice of any defect in title.",
    area: "General Law",
    tags: ["good faith", "genuine", "property", "contract"]
  },
  {
    id: 62,
    latin: "Mala fide",
    english: "In bad faith",
    meaning: "Acting with dishonest intent, fraud, or deceit. The opposite of bona fide.",
    area: "General Law",
    tags: ["bad faith", "fraud", "dishonesty"]
  },
  {
    id: 63,
    latin: "Lex non cogit ad impossibilia",
    english: "The law does not compel the impossible",
    meaning: "The law cannot require a person to do something that is genuinely impossible.",
    area: "General Law",
    tags: ["impossibility", "obligation", "general", "contract"]
  },
  {
    id: 64,
    latin: "Per incuriam",
    english: "Through lack of care",
    meaning: "A decision made in error — by failing to take account of a relevant statute or binding precedent. Such decisions carry less precedential weight.",
    area: "Jurisprudence",
    tags: ["precedent", "error", "case law", "courts"]
  },
  {
    id: 65,
    latin: "Prima facie",
    english: "On the face of it / At first glance",
    meaning: "Evidence sufficient to establish a fact unless rebutted. A case that is established at first sight, before deeper examination.",
    area: "Evidence",
    tags: ["evidence", "first sight", "case", "presumption"]
  },
  {
    id: 66,
    latin: "In limine",
    english: "At the threshold / At the outset",
    meaning: "A motion or ruling made before or at the beginning of a trial, often to exclude inadmissible evidence.",
    area: "Procedural Law",
    tags: ["procedure", "evidence", "motion", "trial"]
  },
  {
    id: 67,
    latin: "Restitutio in integrum",
    english: "Restoration to the original position",
    meaning: "The principle that a successful claimant should be put back into the position they were in before the wrong was committed.",
    area: "Remedies",
    tags: ["remedies", "damages", "equity", "restoration"]
  },
  {
    id: 68,
    latin: "Ex gratia",
    english: "As a favour / Out of grace",
    meaning: "A payment or act done as a favour, not from any legal obligation. An ex gratia payment does not imply admission of liability.",
    area: "General Law",
    tags: ["payment", "no liability", "gift", "settlement"]
  },
  {
    id: 69,
    latin: "Non est factum",
    english: "It is not my deed",
    meaning: "A plea that the person signing a document did not understand what they were signing, rendering the contract void.",
    area: "Contract Law",
    tags: ["contract", "void", "mistake", "document"]
  },
  {
    id: 70,
    latin: "Nemo tenetur seipsum accusare",
    english: "No one is bound to accuse himself",
    meaning: "The privilege against self-incrimination: no accused person can be compelled to give evidence against themselves.",
    area: "Criminal Law",
    tags: ["self-incrimination", "criminal", "rights", "fair trial"]
  },
  {
    id: 71,
    latin: "Lex iniusta non est lex",
    english: "An unjust law is not a law",
    meaning: "A principle from natural law theory: a law that is manifestly unjust lacks the moral authority to be considered true law.",
    area: "Jurisprudence",
    tags: ["natural law", "justice", "jurisprudence", "morality"]
  },
  {
    id: 72,
    latin: "Ab initio",
    english: "From the beginning",
    meaning: "Void ab initio means a contract or act is treated as if it never existed, from the very start.",
    area: "Contract Law",
    tags: ["void", "beginning", "contract", "nullity"]
  },
  {
    id: 73,
    latin: "In camera",
    english: "In the chamber / In private",
    meaning: "Proceedings held in the judge's private chambers or with the public excluded, often to protect sensitive information.",
    area: "Procedural Law",
    tags: ["private", "closed court", "procedure", "confidential"]
  },
  {
    id: 74,
    latin: "Sub silentio",
    english: "In silence / Under silence",
    meaning: "A principle decided or passed without express discussion or statement. A case decided sub silentio may have limited precedential value.",
    area: "Jurisprudence",
    tags: ["precedent", "silence", "case law", "courts"]
  },
  {
    id: 75,
    latin: "Force majeure",
    english: "Superior force",
    meaning: "An unforeseeable event or circumstance (such as natural disaster or war) that prevents a party from fulfilling their contractual obligations.",
    area: "Contract Law",
    tags: ["contract", "frustration", "impossibility", "event"]
  },
  {
    id: 76,
    latin: "Lis pendens",
    english: "A pending suit",
    meaning: "A notice that litigation is pending on a piece of property, which warns anyone dealing with the property of the ongoing dispute.",
    area: "Property Law",
    tags: ["property", "litigation", "notice", "pending"]
  },
  {
    id: 77,
    latin: "Ferae naturae",
    english: "Of a wild nature",
    meaning: "Animals that are wild by nature and not domesticated. Liability for harm caused by such animals differs from that for domestic animals.",
    area: "Tort Law",
    tags: ["wild animals", "tort", "liability", "property"]
  },
  {
    id: 78,
    latin: "Damnum absque injuria",
    english: "Damage without wrong",
    meaning: "A loss or damage suffered for which the law provides no remedy because no legal right has been infringed.",
    area: "Tort Law",
    tags: ["damage", "no legal wrong", "tort", "remedy"]
  },
  {
    id: 79,
    latin: "Lex fori",
    english: "The law of the forum",
    meaning: "The law of the country in which a legal action is brought. Procedural matters are generally governed by the lex fori.",
    area: "Private International Law",
    tags: ["jurisdiction", "conflict of laws", "procedure"]
  },
  {
    id: 80,
    latin: "Audiatur et altera pars",
    english: "Let the other side also be heard",
    meaning: "Another formulation of the natural justice rule: both parties must be given the opportunity to present their case.",
    area: "Natural Justice",
    tags: ["natural justice", "fair hearing", "bias", "procedure"]
  },
  {
    id: 81,
    latin: "Assentio mentium",
    english: "The meeting of minds",
    meaning: "True consent or agreement of both parties necessary for a valid contract.",
    area: "Contract Law",
    tags: ["contract", "consent", "meeting of minds"]
  },
  {
    id: 82,
    latin: "Suppressio veri",
    english: "Suppression of truth",
    meaning: "Concealment of a material fact that constitutes misrepresentation or fraud.",
    area: "Contract / Equity",
    tags: ["fraud", "misrepresentation", "concealment", "equity"]
  },
  {
    id: 83,
    latin: "Sine qua non",
    english: "Without which not",
    meaning: "An essential condition or element without which something cannot exist or be done. In tort, the 'but for' test of causation.",
    area: "Tort / General Law",
    tags: ["causation", "tort", "essential", "condition"]
  },
  {
    id: 84,
    latin: "In pari materia",
    english: "On the same matter",
    meaning: "A principle of statutory construction: statutes dealing with the same subject matter should be interpreted consistently.",
    area: "Statutory Interpretation",
    tags: ["interpretation", "statute", "consistency"]
  },
  {
    id: 85,
    latin: "Novus actus interveniens",
    english: "A new intervening act",
    meaning: "An act by a third party or an unforeseen event that breaks the chain of causation between the defendant's act and the claimant's loss.",
    area: "Tort Law",
    tags: ["causation", "tort", "chain of causation", "intervening act"]
  },
  {
    id: 86,
    latin: "Res judicata",
    english: "A matter already judged",
    meaning: "Once a matter has been finally decided by a competent court, it cannot be re-litigated between the same parties.",
    area: "Procedural Law",
    tags: ["finality", "precedent", "estoppel", "procedure"]
  },
  {
    id: 87,
    latin: "Per se",
    english: "By itself / In itself",
    meaning: "Intrinsically, without reference to additional facts or circumstances. Actionable per se means no proof of damage is needed.",
    area: "General Law",
    tags: ["general", "inherently", "tort", "actionable"]
  },
  {
    id: 88,
    latin: "Sua sponte",
    english: "Of its own accord",
    meaning: "When a court acts or raises an issue on its own motion, without either party requesting it.",
    area: "Procedural Law",
    tags: ["court", "own motion", "procedure", "initiative"]
  },
  {
    id: 89,
    latin: "Ad hoc",
    english: "For this purpose",
    meaning: "Created or done for a particular purpose as necessary, rather than as a general rule or permanent arrangement.",
    area: "General Law",
    tags: ["specific", "purpose", "temporary", "general"]
  },
  {
    id: 90,
    latin: "Inter alia",
    english: "Among other things",
    meaning: "Used in legal documents and judgments to indicate that what is mentioned is only part of a more inclusive list.",
    area: "General Law",
    tags: ["general", "among others", "drafting", "interpretation"]
  },
  {
    id: 91,
    latin: "Mutatis mutandis",
    english: "With the necessary changes having been made",
    meaning: "Used to indicate that something applies to a new situation with appropriate modifications.",
    area: "General Law",
    tags: ["general", "modification", "application", "analogy"]
  },
  {
    id: 92,
    latin: "Pari passu",
    english: "On equal footing / At the same rate",
    meaning: "Proportionate equality, particularly in insolvency where creditors of the same class rank equally and are paid proportionally.",
    area: "Insolvency / Company Law",
    tags: ["insolvency", "equality", "creditors", "company law"]
  },
  {
    id: 93,
    latin: "Beneficium ordinis",
    english: "Benefit of order",
    meaning: "The right of a guarantor to insist that a creditor first exhaust remedies against the principal debtor before pursuing the guarantor.",
    area: "Contract Law",
    tags: ["guarantee", "surety", "contract", "order"]
  },
  {
    id: 94,
    latin: "Falsa demonstratio non nocet",
    english: "A false description does not vitiate",
    meaning: "A misdescription in a document does not invalidate it if the subject matter can still be identified with certainty.",
    area: "Contract / Property Law",
    tags: ["description", "contract", "property", "mistake"]
  },
  {
    id: 95,
    latin: "Ubi eadem ratio ibi idem jus",
    english: "Where there is the same reason, there is the same law",
    meaning: "Where the same rationale exists, the same legal rule should apply — the basis for legal analogy.",
    area: "Jurisprudence",
    tags: ["analogy", "ratio", "jurisprudence", "principle"]
  },
  {
    id: 96,
    latin: "Vigilantibus non dormientibus jura subveniunt",
    english: "The law aids the vigilant, not those who sleep on their rights",
    meaning: "The basis for limitation periods: a party who delays too long in asserting their rights may lose the ability to do so.",
    area: "Limitation Law",
    tags: ["limitation", "delay", "laches", "remedy"]
  },
  {
    id: 97,
    latin: "Verba sunt intelligenda ut res magis valeat quam pereat",
    english: "Words are to be understood so that the subject matter may be preserved rather than destroyed",
    meaning: "A construction that validates a document is preferred to one that would make it void.",
    area: "Statutory / Contract Interpretation",
    tags: ["interpretation", "contract", "statute", "validity"]
  },
  {
    id: 98,
    latin: "Ut res magis valeat quam pereat",
    english: "It is better for a thing to have effect than to be made void",
    meaning: "Courts prefer interpretations that give effect to legal instruments rather than destroying them.",
    area: "Interpretation",
    tags: ["interpretation", "effectiveness", "courts", "contract"]
  },
  {
    id: 99,
    latin: "Respondeat superior",
    english: "Let the master answer",
    meaning: "An employer is liable for the wrongful acts of their employees performed in the course of their employment.",
    area: "Employment / Tort Law",
    tags: ["vicarious liability", "employment", "employer", "tort"]
  },
  {
    id: 100,
    latin: "Communis error facit jus",
    english: "Common error makes law",
    meaning: "A long-established and universal error or custom may acquire the force of law through constant usage and reliance.",
    area: "Jurisprudence",
    tags: ["custom", "usage", "general", "error"]
  },
  {
    id: 101,
    latin: "Expressum facit cessare tacitum",
    english: "What is expressed makes what is implied silent",
    meaning: "An express term in a contract excludes an implied term covering the same matter.",
    area: "Contract Law",
    tags: ["contract", "terms", "interpretation"]
  },
  {
    id: 102,
    latin: "Generalia specialibus non derogant",
    english: "General provisions do not override special ones",
    meaning: "In law, specific rules take precedence over general ones.",
    area: "Statutory Interpretation",
    tags: ["statute", "interpretation", "special"]
  },
  {
    id: 103,
    latin: "Interest reipublicae ut sit finis litium",
    english: "It is in the interest of the state that there be an end to litigation",
    meaning: "The public interest requires that legal disputes eventually come to a final resolution.",
    area: "Procedural Law",
    tags: ["finality", "litigation", "public interest"]
  },
  {
    id: 104,
    latin: "Justitia nemini neganda est",
    english: "Justice is to be denied to no one",
    meaning: "Every person has a fundamental right to access the courts and receive a fair trial.",
    area: "Natural Justice",
    tags: ["justice", "rights", "fair trial"]
  },
  {
    id: 105,
    latin: "Lex est norma recti",
    english: "The law is a rule of right",
    meaning: "Law is the standard of what is morally and legally correct.",
    area: "Jurisprudence",
    tags: ["justice", "morality", "rule"]
  },
  {
    id: 106,
    latin: "Magna Charta",
    english: "The Great Charter",
    meaning: "The foundational document of English liberties, establishing that the monarch is not above the law.",
    area: "Constitutional Law",
    tags: ["liberty", "constitution", "rule of law"]
  },
  {
    id: 107,
    latin: "Nemo debet locupletari ex altera iactura",
    english: "No one should be enriched at the loss of another",
    meaning: "The principle against unjust enrichment.",
    area: "Restitution",
    tags: ["unjust enrichment", "restitution", "equity"]
  },
  {
    id: 108,
    latin: "Pendente lite",
    english: "While litigation is pending",
    meaning: "Matters that occur or are addressed while a lawsuit is still active.",
    area: "Procedural Law",
    tags: ["litigation", "pending", "procedure"]
  },
  {
    id: 109,
    latin: "Qui sentit commodum, sentire debet et onus",
    english: "He who enjoys the benefit ought also to bear the burden",
    meaning: "Whoever receives a legal benefit must also accept any associated responsibilities or liabilities.",
    area: "General Law",
    tags: ["burden", "benefit", "equity"]
  },
  {
    id: 110,
    latin: "Res nullius",
    english: "Nobody's thing",
    meaning: "Property that does not belong to anyone, such as wild animals in their natural state.",
    area: "Property Law",
    tags: ["property", "ownership", "wildlife"]
  },
  {
    id: 111,
    latin: "Salus reipublicae suprema lex",
    english: "The safety of the republic is the supreme law",
    meaning: "The welfare of the state is the highest priority in legal and political decisions.",
    area: "Constitutional Law",
    tags: ["state", "safety", "public interest"]
  },
  {
    id: 112,
    latin: "Ubi consensus, ibi lex",
    english: "Where there is agreement, there is law",
    meaning: "The law respects and enforces the mutual agreement of private parties.",
    area: "Contract Law",
    tags: ["agreement", "contract", "consent"]
  },
  {
    id: 113,
    latin: "Verba fortius accipiuntur contra proferentem",
    english: "Words are to be taken most strongly against the shadow / the one who proposes them",
    meaning: "The rule that ambiguous terms in a contract are interpreted against the party who drafted them.",
    area: "Contract Law",
    tags: ["interpretation", "contra proferentem", "drafting"]
  },
  {
    id: 114,
    latin: "Abundans cautela non nocet",
    english: "Abundant caution does no harm",
    meaning: "Taking extra precautions in legal drafting or practice is always advisable.",
    area: "General Law",
    tags: ["caution", "practice", "drafting"]
  },
  {
    id: 115,
    latin: "Accessio cedit principali",
    english: "The accessory follows the principal",
    meaning: "When something is added to a larger item, it becomes the property of the owner of the principal item.",
    area: "Property Law",
    tags: ["property", "ownership", "attachment"]
  },
  {
    id: 116,
    latin: "Bis dat qui cito dat",
    english: "He gives twice who gives quickly",
    meaning: "A benefit or remedy is much more valuable when provided promptly without delay.",
    area: "Equity",
    tags: ["promptness", "remedy", "equity"]
  },
  {
    id: 117,
    latin: "Corpus delicti",
    english: "The body of the crime",
    meaning: "The material evidence establishing that a crime has been committed.",
    area: "Criminal Law",
    tags: ["evidence", "crime", "criminal"]
  },
  {
    id: 118,
    latin: "Culpa lata dolus est",
    english: "Gross negligence is equivalent to fraud",
    meaning: "In certain legal contexts, extreme carelessness is treated with the same severity as intentional wrongdoing.",
    area: "Tort / Civil Law",
    tags: ["negligence", "fraud", "intent"]
  },
  {
    id: 119,
    latin: "Dies dominicus non est juridicus",
    english: "Sunday is not a day for judicial proceedings",
    meaning: "Traditionally, courts do not sit or issue processes on Sundays.",
    area: "Procedural Law",
    tags: ["sunday", "procedure", "time"]
  },
  {
    id: 120,
    latin: "Ex aequo et bono",
    english: "According to what is right and good",
    meaning: "A principle allowing judges or arbitrators to decide based on fairness rather than strict law.",
    area: "Arbitration / Equity",
    tags: ["fairness", "equity", "arbitration"]
  },
  {
    id: 121,
    latin: "Falsus in uno, falsus in omnibus",
    english: "False in one thing, false in everything",
    meaning: "A witness who is found to have lied on one material point may be deemed entirely unreliable.",
    area: "Evidence",
    tags: ["witness", "credibility", "evidence"]
  },
  {
    id: 122,
    latin: "Gradus non in legibus sed in factis",
    english: "The degree is not in the laws but in the facts",
    meaning: "The severity or grade of an offence is determined by the specific circumstances of the case.",
    area: "Jurisprudence",
    tags: ["facts", "severity", "criminal"]
  },
  {
    id: 123,
    latin: "Hereditas nunquam ascendit",
    english: "Inheritance never ascends",
    meaning: "A traditional rule of property law stating that estates generally pass to descendants rather than ancestors.",
    area: "Succession Law",
    tags: ["inheritance", "succession", "property"]
  },
  {
    id: 124,
    latin: "Impotentia excusat legem",
    english: "Inability excuses the law",
    meaning: "If a person is physically or legally unable to comply with a requirement, the law may excuse them.",
    area: "General Law",
    tags: ["impossibility", "excuse", "obligation"]
  },
  {
    id: 125,
    latin: "Judicis est jus dicere, non dare",
    english: "It is the province of a judge to declare the law, not to give it",
    meaning: "Judges should interpret existing laws rather than creating new ones (separation of powers).",
    area: "Jurisprudence",
    tags: ["judges", "interpretation", "legislation"]
  },
  {
    id: 126,
    latin: "Leges posteriores priores contrarias abrogant",
    english: "Later laws repeal earlier laws that are contrary to them",
    meaning: "The most recent legislative act takes priority in case of conflict.",
    area: "Statutory Interpretation",
    tags: ["repeal", "legislation", "statute"]
  },
  {
    id: 127,
    latin: "Mala gramatica non vitiat chartam",
    english: "Bad grammar does not vitiate a deed",
    meaning: "Errors in grammar do not invalidate a legal document if the intent is clear.",
    area: "Contract / Property Law",
    tags: ["grammar", "deed", "validity"]
  },
  {
    id: 128,
    latin: "Necessitas publicae major est quam privata",
    english: "Public necessity is greater than private necessity",
    meaning: "The interests of the community take precedence over individual private interests in times of crisis.",
    area: "Constitutional Law",
    tags: ["necessity", "public interest", "emergency"]
  },
  {
    id: 129,
    latin: "Omnia praesumuntur contra spoliatorem",
    english: "All things are presumed against the wrongdoer",
    meaning: "When evidence is destroyed or withheld, the court may infer that it would have been adverse to the party responsible.",
    area: "Evidence",
    tags: ["evidence", "presumption", "wrongdoer"]
  },
  {
    id: 130,
    latin: "Pacta privata juri publico non derogant",
    english: "Private agreements cannot derogate from public law",
    meaning: "Parties cannot contract out of mandatory statutory duties or public policy rules.",
    area: "General Law",
    tags: ["contract", "public policy", "statute"]
  },
  {
    id: 131,
    latin: "Qui tacet consentire videtur",
    english: "He who is silent is deemed to consent",
    meaning: "In certain situations, remaining silent when one ought to speak may be interpreted as agreement.",
    area: "General Law",
    tags: ["silence", "consent", "agreement"]
  },
  {
    id: 132,
    latin: "Res inter alios acta aliis neque nocere neque prodesse potest",
    english: "A matter transacted between some persons should not harm or benefit others",
    meaning: "The principle of privity of contract: a third party generally cannot be bound by an agreement they were not part of.",
    area: "Contract Law",
    tags: ["privity", "contract", "third party"]
  },
  {
    id: 133,
    latin: "Semper in dubiis benigniora praeferenda",
    english: "In doubtful cases, the more liberal interpretation is always to be preferred",
    meaning: "When a law or contract is ambiguous, the court should favor a more generous or curative interpretation.",
    area: "Interpretation",
    tags: ["ambiguity", "interpretation", "doubt"]
  },
  {
    id: 134,
    latin: "Transit terra cum onere",
    english: "Land passes with its burdens",
    meaning: "The purchaser of land takes it subject to existing encumbrances like easements or mortgages.",
    area: "Property Law",
    tags: ["land", "property", "encumbrance"]
  },
  {
    id: 135,
    latin: "Ubi jus incertum, ibi jus nullum",
    english: "Where the law is uncertain, there is no law",
    meaning: "The rule of law requires certainty and predictability in legal standards.",
    area: "Jurisprudence",
    tags: ["certainty", "rule of law", "clarity"]
  },
  {
    id: 136,
    latin: "Valor est favor",
    english: "Value is weight",
    meaning: "In property transactions, the value paid (consideration) is a significant factor in determining the strength of a party's claim.",
    area: "Property Law",
    tags: ["value", "consideration", "property"]
  },
  {
    id: 137,
    latin: "Warrantizatus res",
    english: "A warranted thing",
    meaning: "Property that is sold with a guarantee of its title and quality.",
    area: "Contract Law",
    tags: ["warranty", "contract", "guarantee"]
  },
  {
    id: 138,
    latin: "Xenia",
    english: "Gifts",
    meaning: "In some ancient legal contexts, the custom of hospitality and gift-giving carried legal or quasi-legal obligations.",
    area: "Customary Law",
    tags: ["custom", "gifts", "history"]
  },
  {
    id: 139,
    latin: "Yielding up",
    english: "Restoring possession",
    meaning: "The obligation of a tenant to return possession of the property to the landlord at the end of a lease.",
    area: "Landlord and Tenant Law",
    tags: ["lease", "possession", "tenant"]
  },
  {
    id: 140,
    latin: "Zona",
    english: "A zone or boundary",
    meaning: "A defined area where specific legal rules or jurisdictions apply (zoning laws).",
    area: "Administrative Law",
    tags: ["boundary", "zoning", "jurisdiction"]
  },
  {
    id: 141,
    latin: "Actus me invito factus, non est meus actus",
    english: "An act done by me against my will is not my act",
    meaning: "An act committed under physical compulsion or extreme duress may not be legally attributable to the person.",
    area: "Criminal / Tort Law",
    tags: ["duress", "compulsion", "will"]
  },
  {
    id: 142,
    latin: "Boni judicis est ampliare jurisdictionem",
    english: "It is the duty of a good judge to enlarge his jurisdiction",
    meaning: "Traditionally, it was seen as desirable for judges to expand the scope of legal protection through their rulings.",
    area: "Jurisprudence",
    tags: ["judges", "jurisdiction", "discretion"]
  },
  {
    id: 143,
    latin: "Cogitationis poenam nemo patitur",
    english: "No one suffers punishment for his thoughts",
    meaning: "The law only punishes external acts, not mere intention or thoughts that are not acted upon.",
    area: "Criminal Law",
    tags: ["thought", "intent", "punishment"]
  },
  {
    id: 144,
    latin: "Delegata potestas non potest delegari",
    english: "A delegated power cannot be further delegated",
    meaning: "Stronger version of the rule against sub-delegation of authority.",
    area: "Administrative Law",
    tags: ["delegation", "authority", "administrative"]
  },
  {
    id: 145,
    latin: "Executio juris non habet injuriam",
    english: "The execution of law does no injury",
    meaning: "Lawful actions taken by officers of the court to enforce judgments do not constitute legal wrongs.",
    area: "Procedural Law",
    tags: ["execution", "enforcement", "officers"]
  },
  {
    id: 146,
    latin: "Favorabilia in lege",
    english: "Things favored in the law",
    meaning: "Principles or parties (like the accused or small tenants) that the legal system historically grants preferential treatment to.",
    area: "General Law",
    tags: ["favor", "principles", "protection"]
  },
  {
    id: 147,
    latin: "Generalitas parit confusionem",
    english: "Generality breeds confusion",
    meaning: "Legal drafting should be specific and precise to avoid ambiguity and disputes.",
    area: "Legal Drafting",
    tags: ["drafting", "clarity", "precision"]
  },
  {
    id: 148,
    latin: "Haeredem Deus facit, non homo",
    english: "God makes the heir, not man",
    meaning: "A historic maxim regarding the natural sequence of blood inheritance.",
    area: "Succession Law",
    tags: ["inheritance", "succession", "heir"]
  },
  {
    id: 149,
    latin: "In criminalibus probationes debent esse luce clariores",
    english: "In criminal cases, the proofs ought to be clearer than light",
    meaning: "Proof beyond reasonable doubt is required for criminal convictions.",
    area: "Criminal Law / Evidence",
    tags: ["evidence", "proof", "criminal"]
  },
  {
    id: 150,
    latin: "Juris ignorantia est cum per omnia ignoratur",
    english: "Ignorance of the law is when it is completely unknown",
    meaning: "A deep lack of legal knowledge among a population is a systemic challenge for the rule of law.",
    area: "Jurisprudence",
    tags: ["ignorance", "rule of law", "knowledge"]
  }
];
