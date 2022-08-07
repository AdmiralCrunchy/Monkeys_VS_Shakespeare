const sequelize = require('../config/connection');
const { Book, Enemy, Section } = require('../models');

const books = [
	{
		name: 'Hamlet',
		description: `The ghost of the King of Denmark tells his son Hamlet to avenge his murder by killing the new king, Hamlet's uncle. Hamlet feigns madness, contemplates life and death, and seeks revenge. His uncle, fearing for his life, also devises plots to kill Hamlet. The play ends with a duel, during which the King, Queen, Hamlet's opponent and Hamlet himself are all killed. `,
	},
];
const sections = [
	{
		book_id: 1,
		contents: `‘I can,’ said Horatio. ‘At least I can tell you the rumours. Our late King, whose ghost we’ve just seen, was challenged to a duel by Fortinbras, the King of Norway, who was driven by an envious pride. Our valiant King Hamlet, as this part of our known world knew him, killed this Fortinbras, who by the legal terms of the duel forfeited all his lands to his conqueror along with his life. Our King had lodged a similar agreement, with Danish territories going to Norway if Fortinbras had won. Now, sir, the young Fortinbras has grown up and, although he’s a novice in war, he’s spoiling for a fight and has assembled a gang of lawless troublemakers from the backwaters of Norway. For little more than their daily food they will try and recover the lands lost in that duel. From what I can gather this is the main reason for the watch and the frantic preparations for war.’`,
		time_allowed: 15,
	},
	{
		book_id: 1,
		contents: `It certainly stirs the imagination,’ said Horatio. ‘At the height of Rome’s might, just before the mighty Julius Caesar was assassinated, graves opened and the dead walked the streets muttering and wailing. Stars of flaming fire came as disasters from the sun, and the moon, which influences Neptune’s watery empire, was eclipsed. Similar sightings, like warnings from heaven or prologues of an ill omen about to happen, have been witnessed here, by our own countrymen.’ He saw the ghost coming slowly towards them. ‘But look!’ he said, ‘the ghost comes again. I’ll approach it even though it might sweep me aside.’
        The ghost walked past them without altering its pace.`,
		time_allowed: 15,
	},
	{
		book_id: 1,
		contents: `Horatio followed it. ‘Stop, illusion!’ he commanded. ‘If you can make any sound or have a voice, speak to me. If there’s any good thing that has to be done that will give you peace and bring me grace, speak to me. If you have any foreknowledge of your country’s fate, which perhaps prior knowledge of may avoid, oh speak. Or if you have hoarded stolen treasure during your life, for which reasons, they say, you spirits walk after death, tell me about it.’
        A cock crowed somewhere. The ghost continued walking.
        ‘Stop it, Marcellus!’ Horatio tried to grasp it but his hands went right through it.
        ‘Shall I hit it with my spear?’ said Marcellus.
        ‘Do so if it won’t stop,’ said Horatio.`,
		time_allowed: 15,
	},
	{
		book_id: 1,
		contents: `‘I am your father’s spirit, doomed for a certain time to walk the night, and for the day to burn in fires, till the foul crimes done during my lifetime have been burnt and purged away. But that I am forbidden to tell the secrets of my prison-house I could tell a tale whose lightest word would shrivel up your soul, freeze your young blood, make your eyes start from their sockets and your hair stand up on end like the quills of a frightened porcupine. But this eternal torture is not for ears of flesh and blood. Listen, oh listen! If you ever loved your dear father `,
		time_allowed: 15,
	},
	{
		book_id: 1,
		contents: `The ghost turned its head slightly towards the east then looked at Hamlet again. ‘I think I can smell the morning air,’ it said. ‘Let me be brief. Sleeping in my orchard, which, as you know, was my custom in the afternoon, your uncle crept up with a vial of poisonous yew when he was certain that I would be asleep and poured the poisonous liquid into my ear. This substance is so alien to a man’s blood that it glides rapidly, like quicksilver, through the veins and arteries, and with mighty energy, thickens and curdles the thin and wholesome blood like lemon juice in milk. And so it did mine. I was instantly scurvy, like a leper, my smooth body covered with vile and loathsome scabs. And in that way, sleeping, at the hands of a brother, I was summarily deprived of my life, my queen and my crown. I was cut off, right in the fullness of my sins, without benefit of sacrament or the last rites of repentance, no chance of atonement, but sent to my judgment with all my imperfections on my head.’`,
		time_allowed: 15,
	},
	{
		book_id: 1,
		contents: `Hamlet’s heart was beating fast. In the name of all the angels, of earth, and even hell, don’t let his heart burst! And don’t let his muscles fail him, but hold him up. Remember him! Yes, as long as memory would last in his confused brain. Remember him! Yes, he would erase every other foolish memory – everything he had read, people he had known, all the troubles he’d had in his life, and the ghost’s commandment would be the only thing that lived in the book of his mind, uncomplicated by the presence of irrelevant things. He swore to that. He doubled his body over, as though in physical pain. Oh most pernicious woman. Oh villain, villain, smiling damned villain! His slate. He would have to write it down. He pulled the small slate and a piece of chalk out of his pocket. That one may smile and smile and be a villain! That was at least certain in Denmark. He made a few notes in the dawn light.`,
		time_allowed: 15,
	},
	{
		book_id: 1,
		contents: `‘There are more things in heaven and earth, Horatio, than are dreamt of in your philosophy. But come.’ Hamlet held his sword out. ‘Here, as you were going to do, swear that you will never, so help you God, no matter how odd or strangely I behave – because perhaps at some stage I may think it appropriate to put on an act – that you, seeing me at those times, will never, with such things as folded arms, or a shake of the head, or by saying something like “well, well, well, we know”, or “we could tell you if we wanted to”, or “our lips are sealed”, or “there are people who could explain this if they wanted to”, or such ambiguous communication, to show that you know anything about me. Don’t do it. So that grace and mercy will help you when you need it most, swear.`,
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
];
