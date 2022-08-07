const sequelize = require('../config/connection');
const { Book, Enemy, Section } = require('../models');

const books = [
	{
		name: 'Hamlet',
		description: `The ghost of the King of Denmark tells his son Hamlet to avenge his murder by killing the new king, Hamlet's uncle. Hamlet feigns madness, contemplates life and death, and seeks revenge. His uncle, fearing for his life, also devises plots to kill Hamlet. The play ends with a duel, during which the King, Queen, Hamlet's opponent and Hamlet himself are all killed. `,
	},
	{
		name: 'Romeo & Juliet',
		description: `The Romeo and Juliet play is set in Renaissance Verona in Italy. In the Elizabethan imagination that would have presented a picture of heat, quick tempers and violence.`,
	},
	{
		name: 'Macbeth',
		description: `In Macbeth, the murder of a king by one of his subjects is seen as unnatural and the images of the play reflect this theme, with disruptions of nature, like storms – and events such as where the horses turn on their grooms and bite them. In Macbeth Shakespeare explores what it is to be a man. Lady Macbeth accuses Macbeth of being unmanly because of his hesitation in killing Duncan, but Macbeth says that it’s unmanly for a man to kill his king. Shakespeare plays with that paradox. Duncan is a good king and a good man, and he is surrounded by images of light. Macbeth and Lady Macbeth turn their surroundings into a picture of hell, blanketed in darkness. Those images of light and dark interact throughout the play.`,
	},
];
const sections = [
	{
		book_id: 1,
		contents: `I can,’ said Horatio. At least I can tell you the rumours. Our late King, whose ghost we’ve just seen, was challenged to a duel by Fortinbras, the King of Norway, who was driven by an envious pride. Our valiant King Hamlet, as this part of our known world knew him, killed this Fortinbras, who by the legal terms of the duel forfeited all his lands to his conqueror along with his life. Our King had lodged a similar agreement, with Danish territories going to Norway if Fortinbras had won. Now, sir, the young Fortinbras has grown up and, although he’s a novice in war, he’s spoiling for a fight and has assembled a gang of lawless troublemakers from the backwaters of Norway. For little more than their daily food they will try and recover the lands lost in that duel. From what I can gather this is the main reason for the watch and the frantic preparations for war.`,
		time_allowed: 15,
	},
	{
		book_id: 1,
		contents: `It certainly stirs the imagination,’ said Horatio. At the height of Rome’s might, just before the mighty Julius Caesar was assassinated, graves opened and the dead walked the streets muttering and wailing. Stars of flaming fire came as disasters from the sun, and the moon, which influences Neptune’s watery empire, was eclipsed. Similar sightings, like warnings from heaven or prologues of an ill omen about to happen, have been witnessed here, by our own countrymen. He saw the ghost coming slowly towards them. But look! he said, the ghost comes again. I’ll approach it even though it might sweep me aside.
        The ghost walked past them without altering its pace.`,
		time_allowed: 15,
	},
	{
		book_id: 1,
		contents: `Horatio followed it. Stop, illusion! he commanded. If you can make any sound or have a voice, speak to me. If there’s any good thing that has to be done that will give you peace and bring me grace, speak to me. If you have any foreknowledge of your country’s fate, which perhaps prior knowledge of may avoid, oh speak. Or if you have hoarded stolen treasure during your life, for which reasons, they say, you spirits walk after death, tell me about it.
        A cock crowed somewhere. The ghost continued walking.
        Stop it, Marcellus!’ Horatio tried to grasp it but his hands went right through it.
        Shall I hit it with my spear? said Marcellus.
        Do so if it won’t stop, said Horatio.`,
		time_allowed: 15,
	},
	{
		book_id: 1,
		contents: `I am your father’s spirit, doomed for a certain time to walk the night, and for the day to burn in fires, till the foul crimes done during my lifetime have been burnt and purged away. But that I am forbidden to tell the secrets of my prison-house I could tell a tale whose lightest word would shrivel up your soul, freeze your young blood, make your eyes start from their sockets and your hair stand up on end like the quills of a frightened porcupine. But this eternal torture is not for ears of flesh and blood. Listen, oh listen! If you ever loved your dear father `,
		time_allowed: 15,
	},
	{
		book_id: 1,
		contents: `The ghost turned its head slightly towards the east then looked at Hamlet again. I think I can smell the morning air, it said. Let me be brief. Sleeping in my orchard, which, as you know, was my custom in the afternoon, your uncle crept up with a vial of poisonous yew when he was certain that I would be asleep and poured the poisonous liquid into my ear. This substance is so alien to a man’s blood that it glides rapidly, like quicksilver, through the veins and arteries, and with mighty energy, thickens and curdles the thin and wholesome blood like lemon juice in milk. And so it did mine. I was instantly scurvy, like a leper, my smooth body covered with vile and loathsome scabs. And in that way, sleeping, at the hands of a brother, I was summarily deprived of my life, my queen and my crown. I was cut off, right in the fullness of my sins, without benefit of sacrament or the last rites of repentance, no chance of atonement, but sent to my judgment with all my imperfections on my head.`,
		time_allowed: 15,
	},
	{
		book_id: 1,
		contents: `Hamlet’s heart was beating fast. In the name of all the angels, of earth, and even hell, don’t let his heart burst! And don’t let his muscles fail him, but hold him up. Remember him! Yes, as long as memory would last in his confused brain. Remember him! Yes, he would erase every other foolish memory – everything he had read, people he had known, all the troubles he’d had in his life, and the ghost’s commandment would be the only thing that lived in the book of his mind, uncomplicated by the presence of irrelevant things. He swore to that. He doubled his body over, as though in physical pain. Oh most pernicious woman. Oh villain, villain, smiling damned villain! His slate. He would have to write it down. He pulled the small slate and a piece of chalk out of his pocket. That one may smile and smile and be a villain! That was at least certain in Denmark. He made a few notes in the dawn light.`,
		time_allowed: 15,
	},
	{
		book_id: 1,
		contents: `There are more things in heaven and earth, Horatio, than are dreamt of in your philosophy. But come. Hamlet held his sword out. Here, as you were going to do, swear that you will never, so help you God, no matter how odd or strangely I behave – because perhaps at some stage I may think it appropriate to put on an act – that you, seeing me at those times, will never, with such things as folded arms, or a shake of the head, or by saying something like “well, well, well, we know”, or “we could tell you if we wanted to”, or “our lips are sealed”, or “there are people who could explain this if they wanted to”, or such ambiguous communication, to show that you know anything about me. Don’t do it. So that grace and mercy will help you when you need it most, swear.`,
		time_allowed: 15,
	},
	{
		book_id: 1,
		contents: `Speak the speech, I pray you, as I pronounced it to
        you, trippingly on the tongue: but if you mouth it,
        as many of your players do, I had as lief the
        town-crier spoke my lines. Nor do not saw the air
        too much with your hand, thus, but use all gently;
        for in the very torrent, tempest, and, as I may say,
        the whirlwind of passion, you must acquire and beget
        a temperance that may give it smoothness. O, it
        offends me to the soul to hear a robustious
        periwig-pated fellow tear a passion to tatters, to
        very rags, to split the ears of the groundlings, who
        for the most part are capable of nothing but
        inexplicable dumbshows and noise: I would have such
        a fellow whipped for o’erdoing Termagant; it
        out-herods Herod: pray you, avoid it.`,
		time_allowed: 15,
	},
	{
		book_id: 1,
		contents: `Be not too tame neither, but let your own discretion
        be your tutor: suit the action to the word, the
        word to the action; with this special o’erstep not
        the modesty of nature: for any thing so overdone is
        from the purpose of playing, whose end, both at the
        first and now, was and is, to hold, as ’twere, the
        mirror up to nature; to show virtue her own feature,
        scorn her own image, and the very age and body of
        the time his form and pressure. Now this overdone,
        or come tardy off, though it make the unskilful
        laugh, cannot but make the judicious grieve; the
        censure of the which one must in your allowance
        o’erweigh a whole theatre of others. O, there be
        players that I have seen play, and heard others
        praise, and that highly, not to speak it profanely,
        that, neither having the accent of Christians nor
        the gait of Christian, pagan, nor man, have so
        strutted and bellowed that I have thought some of
        nature’s journeymen had made men and not made them
        well, they imitated humanity so abominably.`,
		time_allowed: 15,
	},
	{
		book_id: 1,
		contents: `Nay, do not think I flatter;
        For what advancement may I hope from thee
        That no revenue hast but thy good spirits,
        To feed and clothe thee? Why should the poor be flatter’d?
        No, let the candied tongue lick absurd pomp,
        And crook the pregnant hinges of the knee
        Where thrift may follow fawning. Dost thou hear?
        Since my dear soul was mistress of her choice
        And could of men distinguish, her election
        Hath seal’d thee for herself; for thou hast been
        As one, in suffering all, that suffers nothing,
        A man that fortune’s buffets and rewards
        Hast ta’en with equal thanks: and blest are those
        Whose blood and judgment are so well commingled,
        That they are not a pipe for fortune’s finger
        To sound what stop she please. Give me that man
        That is not passion’s slave, and I will wear him
        In my heart’s core, ay, in my heart of heart,
        As I do thee.–Something too much of this.`,
		time_allowed: 15,
	},
	{
		book_id: 2,
		contents: `Verona was coming to life: people poured out of the houses and filled the streets while market traders set up their stalls in the grand piazza. It was a good patch, an excellent place to catch the business of those who lived and worked in the rich houses that lined Verona’s main square. The Capulet mansion was one of the biggest – filled with servants and humming with activity. It was an hour till breakfast and while the cooks sweated over the fires in the kitchen, conjuring mouthwatering aromas of baked breads and hams, the servingmen killed time as best they could. Two of them – hot, bored and restless – stepped out into the bustle of the piazza and swaggered about among the bright colours, the animal smells and the din of traders’ voices, hoping to find some action.`,
		time_allowed: 15,
	},
	{
		book_id: 2,
		contents: `Just as Montague broke loose from his wife’s grasp and was rushing to meet Capulet, who had answered his challenge by coming out to the piazza, still in his nightgown, there was the furious brassy sound of trumpets – dozens of them. Every citizen knew what that fanfare meant. Even Tybalt, although at an advantage in his fight with Benvolio, lowered his sword and turned towards the palace that dominated the piazza with its huge columns and vast porch. The Prince himself, accompanied by scores of his courtiers and officers, was hurrying down the stairs. The fanfare died away and silence spread across the piazza. Everyone watched as the Prince strode to the fountain and stepped up on to the wall. He looked around at his subjects. His face was solemn. His stern gaze fell on Montague and Capulet who stood side by side, their swords still drawn.`,
		time_allowed: 15,
	},
	{
		book_id: 2,
		contents: `Friar Lawrence was up early. The clouds in the eastern sky were streaked with light as the night scurried out of the way of the advancing day. He looked up from time to time. He wanted to fill his basket with a mixture of poisonous and healing herbs before the sun came up to dry the dew. He loved nature. He often thought about the soil – about the way that it encompassed the whole of life. It was a grave that took all life into itself when it died but it was also a mother, from which all new life sprang. Plants fascinated him. He felt that every single plant had great value: even those we think are vile have some power and grace. Every living thing was special although nothing was so good that it couldn’t be dangerous if it was abused.`,
		time_allowed: 15,
	},
	{
		book_id: 2,
		contents: `‘Because she could see you didn’t mean it.’ Friar Lawrence was thinking. Marrying the two young people from the feuding families would be a disaster and he couldn’t possible agree to it. Or could he? It may be the best way of bringing the families together. It could just be the salvation of Verona. It took him a second to decide. ‘Come on then, you young rascal,’ he said. ‘Come with me. This is one thing I can help you with. This could be the answer: the thing to turn your households’ hatred into love.’ ‘Well let’s hurry then,’ said Romeo. ‘I can’t wait.’
        ‘Slow down,’ said the Friar as Romeo started running. ‘You’ll stumble if you try to go too fast.’`,
		time_allowed: 15,
	},
	{
		book_id: 2,
		contents: `‘Now as God is my witness I’m so upset I’m still trembling,’ she said. ‘Awful fellow.’ She breathed deeply. ‘Ah now.’ She looked at Romeo. ‘As I said, I want a word with you. My young lady told me to find you. What she told me to say I’ll keep to myself for the time being. But first let me tell you: if you’re leading her into a fool’s paradise, as they say, it would be the most wicked behaviour, as they say, for the poor girl is very young and therefore if you’re planning to double cross her then it’s a despicable thing to do to any young woman.’ She folded her arms and looked defiantly at him.

        `,
		time_allowed: 15,
	},
	{
		book_id: 2,
		contents: `‘Well Sir, her father’s not happy about the way she’s taken her cousin’s death and thinks her marriage will make her forget the tragedy more quickly. He thinks being by herself and dwelling on it’s bad: it’s better if she has something else to think about. And that’s the reason for having the wedding so soon.’ Friar Lawrence could see the logic of that but he knew it was essential to delay the wedding although he wished he did not know the reason for that. As they got to the door of the chapel he saw Juliet hurrying towards them. She stopped when she recognized Paris. He smiled and took her hand. He raised it to his lips.`,
		time_allowed: 15,
	},
	{
		book_id: 2,
		contents: `‘God joined my heart and Romeo’s and you joined our hands. Before this hand does anything else I’ll use it to kill myself. So you’d better either give me some advice or watch me die.’ She reached for the knife but he whisked it out of her way. ‘Don’t take so long,’ she said. ‘Speak up. I’m longing to die, and will if you don’t give me another solution.’ The Friar didn’t answer immediately. When he did, it was with reluctance. ‘I think there’s a ray of hope,’ he said. ‘It needs a desperate remedy – as desperate as the situation you’re in. If you really would sooner kill yourself than marry Paris then I think you’d be prepared to take this on. You’d have to go through something like death, though. If you dare then I’ll give you the remedy.`,
		time_allowed: 15,
	},
	{
		book_id: 2,
		contents: `‘Oh you can tell me to do anything rather than marry Paris,’ she cried. ‘Tell me to jump from the battlements of any tower, or go out and steal. Tell me to go into a snakepit: chain me up with fierce bears. Make me spend every night in a charnel-house, covered in dead men’s rattling bones, with shinbones running with stinking slime, and yellow skulls with their bottom jaws missing. Or tell me to go into a new grave and snuggle up to a dead man in his shroud – things that would make anyone shudder. And I will do it without hesitation if it means I’ll be able to live a pure and faithful wife to my love.’

        ‘Alright then,’ said the Friar. ‘I’m convinced. Here’s the plan. Go home, put on a happy face. Agree to marry Paris. Tomorrow is Wednesday. Now look here. Make sure that when you go to bed you’re alone in your room. Don’t let your nurse in.’`,
		time_allowed: 15,
	},
	{
		book_id: 2,
		contents: `The Friar went to a chest and unlocked it He took out a small bottle. ‘Here. This is it. When you’re in bed drink the liquid. In a little while your body fluids will grow cold and you will have no pulse. There’ll be no warmth and no breath to show that you’re alive. The colour in your face will go and your eyes will close as though in death. Your limbs will be stiff and cold like a corpse’s.’ He paused. Juliet held out her hand.
        ‘Then, when the bridegroom arrives to wake you up on your wedding day, there you’ll be: dead! After forty-two hours you’ll wake up as though from a pleasant sleep.’`,
		time_allowed: 15,
	},
	{
		book_id: 2,
		contents: `‘He only brought flowers for his lady’s grave,’ said the page. ‘He told the Prince what had happened’. The Prince called for a torch and began reading the letter. Everyone waited for him to finish. At last he folded it. ‘This letter confirms everything that everyone has told me,’ he said. ‘Capulet. Montague. Can you see what punishment you’ve been given for your hatred? And because I’ve turned a blind eye to your quarrels I’ve also lost some of my own family. Everyone’s been punished.’ Capulet was aware of Montague weeping beside him. He thought of Montague’s wife dying from grief at the banishment of her son: he remembered the pain of Tybalt’s death, the way Juliet had shown her reluctance to marry Paris. He looked at the pitiful corpses on the ground in front of him. He turned to Montague. ‘Oh brother Montague, give me your hand,’ he said. ‘This is long overdue. Forgive me.’`,
		time_allowed: 15,
	},
	{
		book_id: 3,
		contents: `Duncan, King of Scotland, was conferring with his sons, Malcolm and Donalbain, at a fortress near Forres. Matters could not be worse. The rebels, led by the northern Thane, Macdonwald, had made an alliance with the Norwegian king and the two forces were preparing to roll across Scotland like a tidal wave. Two sentries brought a limping, bleeding soldier to the King. The man clutched his torn side, resisting an overwhelming desire to pass into unconsciousness. It was clear that he had something important to tell the King. ‘What bloody man is this?’ said Duncan. ‘I can see he’s just come from the battlefield so he’ll be able to give us the latest news.’ ‘Ah!’ exclaimed Malcolm. ‘This is the sergeant who struggled so valiantly to save me from captivity. Hello, brave friend. Tell the King how things stand.’`,
		time_allowed: 15,
	},
	{
		book_id: 3,
		contents: `‘From Fife, great King,’ said Ross. ‘Where Norwegian banners have been flying freely. Norway himself, with the help of that most disloyal of traitors, the Thane of Cawdor, began a terrible assault. Until Macbeth, absolutely fearless, confronted him head on and, matching him point for point, blow for blow, ground him down and, to conclude -’ Ross grinned. ‘The victory fell on us.’ Duncan spun round and beamed at his council. ‘Great happiness!’ he said and clapped his hands. ‘So now,’ said Ross, ‘Sweno’s in disarray. ‘And we didn’t even allow him to bury his men until he had paid us ten thousand dollars.’`,
		time_allowed: 15,
	},
	{
		book_id: 3,
		contents: `Where hast thou been, sister?
		Killing swine.
		Sister, where thou?
		A sailor’s wife had chestnuts in her lap,
		And munched, and munched, and munched:
		Give me,’ quoth I:
		Aroint thee, witch!’ the rump-fed ronyon cries.
		Her husband’s to Aleppo gone, master o’ the Tiger: But in a sieve I’ll thither sail,
		And, like a rat without a tail, I’ll do, I’ll do and I’ll do!
		I’ll give thee a wind.
		Thou’rt kind.
		And I another.
		I myself have all the other; And the very ports they blow, All the quarters that they know In the shipman’s card.
		I’ll drain him dry as hay:
		Sleep shall neither night nor day
		Hang upon his pent-house lid;
		He shall live a man forbid.
		Weary se’nnights nine times nine
		Shall he dwindle, peak and pine:
		Though his bark cannot be lost,
		Yet it shall be tempest-tost.
		Look what I have.
		Show me, show me!
		Here I have a pilot’s thumb,
		Wracked as homeward he did come.`,
		time_allowed: 15,
	},
	{
		book_id: 3,
		contents: `‘Stop!’ said Macbeth. ‘Is that all? Tell me more. I know I’m Thane of Glamis as a result of Sinel’s death. But Cawdor? The Thane of Cawdor is alive and well. And as for being king! It’s no more believable than being Thane of Cawdor. Tell me where you get this strange information. Or why you stop us on this blasted heath with such a prophetic greeting. Speak up, I command you!’ They had gone. ‘These are bubbles of the earth,’ said Banquo. ‘Where have they gone?’ ‘Vanished into the air. And what seemed solid melted like breath in the wind. I wish they had stayed.’ ‘Were we seeing things?’ said Banquo. ‘Have we gone mad?’ Macbeth gazed at his friend for a moment then he laughed. ‘Your children will be kings.’ He doubled over and roared. Banquo began laughing too.`,
		time_allowed: 15,
	},
	{
		book_id: 3,
		contents: `Macbeth was immersed in confusion. What did it mean? He tried to apply reason to it. The weird women had told him two truths as innocent prologues to the imperial theme. This couldn’t be bad. Nor could it be good. If it was bad why did it promise such success for him, beginning with an indisputable fact? He was Thane of Cawdor after all. But if it was good, why did it make him think about doing something so unnatural that it made his hair stand up on end and his heart pound furiously – knocking against his ribs? His worst moments of fear in battle were nothing to the horrors of his imagination now. The thought that kept coming to him was so outrageous, so unsettling, that he was losing all sense of reality.`,
		time_allowed: 15,
	},
	{
		book_id: 3,
		contents: `They met me in the day of success. They have supernatural knowledge. When I tried to question them further they vanished into the air. While I was still standing there, wrapped in wonder, some messengers came from the King, calling me Thane of Cawdor: the title which the weird sisters had only just saluted me with! And they had also referred me to the future with ‘Hail, king that shalt be!’ I had to tell you this my dearest partner of greatness so that you wouldn’t miss the joy of knowing what has been promised you. Think about it and farewell. Lady Macbeth clutched the letter to her heart. He was Glamis already and also Cawdor now! And she knew he would be… what he had been promised!`,
		time_allowed: 15,
	},
	{
		book_id: 3,
		contents: `And yet… She didn’t think he could pull it off. He was too full of the milk of human kindness to do… what was necessary. He wanted greatness, he wasn’t without ambition, but he had no ruthlessness in him. Whatever he wanted to achieve always had to be done honourably. No, he would never betray anyone. And yet he still wanted something he shouldn’t have: what he wanted screamed out: ‘If you want me you must do such and such!’ But he feared to act on it. She couldn’t wait for him to get home so that she could pour her influence into his ear, persuade him away from all the excuses that kept him from wearing the… the round golden shiny headpiece that fate and the supernatural seem to have crowned him with already.`,
		time_allowed: 15,
	},
	{
		book_id: 3,
		contents: `‘Even the raven – the bird of death – that croaks the fatal entrance of Duncan under my battlements is hoarse,’ she said aloud. She closed her eyes and raised her arms to the sky. ‘Come, you spirits that tend on mortal thoughts. Take all my femininity away and fill me from the crown to the toe top full of direst cruelty. Make thick my blood, stop me from feeling pity so that no natural feelings can get in the way.’ She put her hands on her breasts. ‘Come to my woman’s breasts, you spirits of evil, and suck gall from me where there should be milk. Come thick night and shroud me in the dunnest smoke of hell, so that my sharp knife won’t see the wound it makes, nor that the light of heaven peep through the blanket of the dark to cry, ‘stop! stop!’‘`,
		time_allowed: 15,
	},
	{
		book_id: 3,
		contents: `Some time later she lay, propped on her elbow, stroking his hair and staring into his eyes.‘Your face, my Thane, is like a book where one may read strange things.’ She kissed him. ‘To deceive everyone look like everyone else. Be welcoming: show welcome in your eyes, your hand, your tongue. Look like the innocent flower but be the serpent under it. We must provide for… him that’s coming. And you must leave tonight’s great business to me. Business that will shape the rest of our lives.’ Macbeth said nothing. She kissed him again then looked at him with a question in her eyes. He sat up and lifted his clothes from the floor. ‘We’ll talk about it later,’ he said.`,
		time_allowed: 15,
	},
	{
		book_id: 3,
		contents: `He remembered the way Banquo had reproached the witches when they’d first put the name of king on him. And he had insisted that they speak to him. And when they did they looked respectful and hailed Banquo as the father of a line of kings. On his own head they had placed a fruitless crown and put a barren scepter in his hand! To be wrenched away by a hand not of his own family – none of his sons succeeding him. So it was for Banquo’s descendants that he had corrupted his soul. He had murdered the gracious Duncan for them! Stuck thorns in his peace of mind just for them. And given his precious soul to the Devil to turn Banquo’s sons into kings. All that for the seed of Banquo! Rather than that he would defy Fate and fight it to the death.
		The attendant returned with two rough-looking men.`,
		time_allowed: 15,
	},
];

const seedMe = async () => {
	await sequelize.sync({ force: true });
	await books.bulkCreate(books, { individualHooks: true });
	await sections.bulkCreate(sections, { individualHooks: true });
	// const bookObj = await Book.bulkCreate(books);
	// const sectionObj = await Section.bulkCreate(sections);
	console.log('seeding complete');
	process.exit(0);
};
seedMe();
