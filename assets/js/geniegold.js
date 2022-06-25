//Genie Gold Idle Clicker v0.5
//by Minty Crisp @ MintyCrisp.com
//Javascript
//


//
//ToDo
//


//Update Main Store page with basic Badge info - DONE
//
//Update each SubScreen with all Badge info - DONE
//
//Re-Integrate Discounts - DONE
//
//Purchase each badge level - DONE
//
//Update bonus stats on badge level ownership - DONE
//
//Create Badge Template - DONE
//
//Visual Slot Machine Anim Mechanic for eventChecker() - DONE
//
//Have Event Slots make a eventHtmlNotfi that they are running
//
//Have Badges add to Screen on Purchase and Sync Level text value on upgrades
//
//Basic Achievement System to unlock all Badges with new anim notif
//
//Format and Update Achievement Screen with info
//
//Add Icons/Img instead of Basic Text for Slot Faces
//Tweak Pixel Art Versions for cool effect and low data
//
//Fine tune Mobile layout - Clamp for Text
//
//Create Tablet and Desktop layout

//Game Intro & Basic Tutorial
//
//Menu Screen
//
//Settings Functions - Save, Load, etc...
//


//Achievement Unlockers
//
//Badge Achievement Watch Functions
//
//Stats!!!
//lifetimeGold Amount - Always
//currentGold Amount - Always
//LifetimeCrit Hits Num - Always
//Lifetime Clicks - always
//
//Event Hit 1st Time & Repeats - Always
//Store Purchases - Always
//
//Player Tap - After 1st Gold Earned
//Lucky Goldfish - Hit a crit 7 times in 1 min
//Genie Hand 1 - After 1st Purchase
//Genie Hand 2 - Purchase a Genie Hand 1
//Genie Hand 3 - Purchase a Genie Hand 2
//High Noon - After Event pops for the first time
//Gold Coin Rain Storm - After Event pops for the first time
//Genie Challenge - After Event pops for the first time
//Bonus Round - After Event pops for the first time
//Blue Moon - After Event pops for the first time
//Hades Prowl - After Event pops for the first time
//Cosmic Aurora - After Event pops for the first time


//Polish
//
//Add thousand, million, billion, trillion, etc... to main gold counter
//
//if eventActive
//display event name and time in browser window tab text summary
//
//Rotate the 2D Aframe text with the user orbitRotation so it's always readable, Just update the rotation right before activation to the user's camera quaterion
//
//Add clock to tell 24 mini time
//
//Story Text, Anims and Plot Progress
//At game start, Genie will summarize the game lore and give a brief overview of what to expect in the game.
//Create a text box pop up which is the genie talking to you, giving out randomly generated sentences
//
//Add Music and SFX
//
//Double check day/night blending animation switch for sun/moon
//
//have it foggier in the late night / early morning
//
//Additional Commands:
//Create a Pure Keyboard Config (Pure Mouse & Tap Already Done)
//Enter in VR and use Laser Pointer to click. Create in-VR version of the same menus



//Bugs
//

//Border-Radius: 50% not woking in HMDs and not holding ratio on mobile
//Fix, Set the immeadiate div around it to be 1 to 1 sq always

//Auto Clicker 2
//Crits hitting bigger then they should, 3 instead of 2 on a 1 rate
//Old, Need to Confirm.


//Timeout and Interval
var timeout = setTimeout(function () {




//
//Global Variables
//

//
//HTML
var root = document.querySelector(':root');
var sceneEl = document.querySelector('a-scene');
var clickButton = document.getElementById('clickerButton');
var moonLight = document.getElementById('moonLight');
var moonback = document.getElementById('moonback');
var directionalLight = document.getElementById('directionalLight');
var sunback = document.getElementById('sunback');
var genieHand1 = document.getElementById('genieHand1');
var genieHand2 = document.getElementById('genieHand2');
var genieHand3 = document.getElementById('genieHand3');
var aframeText = document.getElementById('textArea');
var hades = document.getElementById('hades');
var goldcounter = document.getElementById('goldcounter');
var goldcountertext = document.getElementById('goldcountertext');
var eventgoldcounter = document.getElementById('eventgoldcounter');
var eventgoldcountertext = document.getElementById('eventgoldcountertext');
var eventbonusnotification = document.getElementById('eventbonusnotification');
var eventbonustext = document.getElementById('eventbonustext');
var eventNotification = document.getElementById('eventNotification'); 
var eventline1 = document.getElementById('eventline1');
var eventline2 = document.getElementById('eventline2');
var eventline3 = document.getElementById('eventline3');
var eventline4 = document.getElementById('eventline4');
var genieBetText = document.getElementById('genieBetText');
var bonusRoundScreen = document.getElementById('bonusRoundScreen');
var bonus1 = document.getElementById('bonus1');
var bonus2 = document.getElementById('bonus2');
var bonus3 = document.getElementById('bonus3');
var bonus4 = document.getElementById('bonus4');
var bonus5 = document.getElementById('bonus5');
var bonus1Text = document.getElementById('bonus1Text');
var bonus2Text = document.getElementById('bonus2Text');
var bonus3Text = document.getElementById('bonus3Text');
var bonus4Text = document.getElementById('bonus4Text');
var bonus5Text = document.getElementById('bonus5Text');
var usergoldpersecond = document.getElementById('usergoldpersecond');
var usergoldpersecond2 = document.getElementById('usergoldpersecond2');
var usergoldpersecond3 = document.getElementById('usergoldpersecond3');
var usergoldpersecond4 = document.getElementById('usergoldpersecond4');
var usergoldpersecond5 = document.getElementById('usergoldpersecond5');
var usergoldpersecond6 = document.getElementById('usergoldpersecond6');
var usergoldpersecond7 = document.getElementById('usergoldpersecond7');
var usergoldpersecond8 = document.getElementById('usergoldpersecond8');
var usergoldpersecond9 = document.getElementById('usergoldpersecond9');
var usergoldpersecond10 = document.getElementById('usergoldpersecond10');
var usergoldpersecond11 = document.getElementById('usergoldpersecond11');
var usergoldpersecond12 = document.getElementById('usergoldpersecond12');
var ghand1goldpersecond = document.getElementById('ghand1goldpersecond');
var ghand2goldpersecond = document.getElementById('ghand2goldpersecond');
var ghand3goldpersecond = document.getElementById('ghand3goldpersecond');
var notificationEvent = document.getElementById('notificationEvent');
var notificationEventText = document.getElementById('notificationEventText');
var notification0 = document.getElementById('notification0');
var notification0Text = document.getElementById('notification0Text');
var notification1 = document.getElementById('notification1');
var notification1Text = document.getElementById('notification1Text');
var notification2 = document.getElementById('notification2');
var notification2Text = document.getElementById('notification2Text');
var notification3 = document.getElementById('notification3');
var notification3Text = document.getElementById('notification3Text');
var notification4 = document.getElementById('notification4');
var notification4Text = document.getElementById('notification4Text');
var notification5 = document.getElementById('notification5');
var notification5Text = document.getElementById('notification5Text');
var notification6 = document.getElementById('notification6');
var notification6Text = document.getElementById('notification6Text');
var notification7 = document.getElementById('notification7');
var notification7Text = document.getElementById('notification7Text');
var notification8 = document.getElementById('notification8');
var notification8Text = document.getElementById('notification8Text');
var notification9 = document.getElementById('notification9');
var notification9Text = document.getElementById('notification9Text');
var notification10 = document.getElementById('notification10');
var notification10Text = document.getElementById('notification10Text');
var notification11 = document.getElementById('notification11');
var notification11Text = document.getElementById('notification11Text');
var notification12 = document.getElementById('notification12');
var notification12Text = document.getElementById('notification12Text');
var hadesgpstext = document.getElementById('hadesgpstext');
var error = document.getElementById('error'); 
var errorText = document.getElementById('errorText');
var menuButton = document.getElementById('menuButton'); 
var storeButton = document.getElementById('storeButton'); 
var screenTitle = document.getElementById('screenTitle'); 
var settingsButton = document.getElementById('settingsButton'); 
var upgradesButton = document.getElementById('upgradesButton'); 
var statsButton = document.getElementById('statsButton'); 
var achievementsButton = document.getElementById('achievementsButton'); 
var subScreenActionButton = document.getElementById('subScreenAction');
var storeDiscountHeldHalf = document.getElementById('storeDiscountHeldHalf'); 
var storeDiscountHeldFull = document.getElementById('storeDiscountHeldFull'); 
var storeDiscountHeldHalfText = document.getElementById('storeDiscountHeldHalfText'); 
var storeDiscountHeldFullText = document.getElementById('storeDiscountHeldFullText'); 
var storeDiscountHeldHalfButton = document.getElementById('storeDiscountHeldHalfButton'); 
var storeDiscountHeldFullButton = document.getElementById('storeDiscountHeldFullButton');
var badgeStore = document.getElementById('badgeStore');
var badgeImage = document.getElementById('badgeImage'); 
var nextBonusCost = document.getElementById('nextBonusCost'); 
var nextBonusBenefit1 = document.getElementById('nextBonusBenefit1'); 
var nextBonusBenefit2 = document.getElementById('nextBonusBenefit2'); 
var overallCps = document.getElementById('overallCps'); 
var lifetimeClicksHtml = document.getElementById('lifetimeClickshtml');
var storeBuyAC = document.getElementById('storeBuyAC');
var upgradeClickOff = document.getElementById('upgradeClickOff'); 
var discountButtons = document.getElementById('discountButtons'); 
var upgradeSubScreen = document.getElementById('upgradeSubScreen');
var upgrades = document.getElementById('upgrades');
var badgeTitle1 = document.getElementById('badgeTitle1');
var badgeTitle2 = document.getElementById('badgeTitle2');
var badgeLevel = document.getElementById('badgeLevel');
var badgeDescription = document.getElementById('badgeDescription');
var badgeBonus1 = document.getElementById('badgeBonus1');
var badgeBonus2 = document.getElementById('badgeBonus2');
var badge1 = document.getElementById('badge1'); 
var badge2 = document.getElementById('badge2'); 
var badge3 = document.getElementById('badge3'); 
var badge4 = document.getElementById('badge4'); 
var badge5 = document.getElementById('badge5'); 
var badge6 = document.getElementById('badge6'); 
var badge7 = document.getElementById('badge7'); 
var badge8 = document.getElementById('badge8'); 
var badge9 = document.getElementById('badge9'); 
var badge10 = document.getElementById('badge10'); 
var badge11 = document.getElementById('badge11'); 
var badge12 = document.getElementById('badge12'); 
var badge13 = document.getElementById('badge13'); 
var badge14 = document.getElementById('badge14'); 
var badge15 = document.getElementById('badge15'); 
var badge1Lock = document.getElementById('badge1Lock');
var badge1Cost = document.getElementById('badge1Cost');
var badge1Image = document.getElementById('badge1Image');
var badge1Title1 = document.getElementById('badge1Title1');
var badge1Title2 = document.getElementById('badge1Title2');
var badge1Level = document.getElementById('badge1Level');
var badge2Cost = document.getElementById('badge2Cost');
var badge2Image = document.getElementById('badge2Image');
var badge2Title1 = document.getElementById('badge2Title1');
var badge2Title2 = document.getElementById('badge2Title2');
var badge2Level = document.getElementById('badge2Level');
var badge3Cost = document.getElementById('badge3Cost');
var badge3Image = document.getElementById('badge3Image');
var badge3Title1 = document.getElementById('badge3Title1');
var badge3Title2 = document.getElementById('badge3Title2');
var badge3Level = document.getElementById('badge3Level');
var badge4Cost = document.getElementById('badge4Cost');
var badge4Image = document.getElementById('badge4Image');
var badge4Title1 = document.getElementById('badge4Title1');
var badge4Title2 = document.getElementById('badge4Title2');
var badge4Level = document.getElementById('badge4Level');
var badge5Cost = document.getElementById('badge5Cost');
var badge5Image = document.getElementById('badge5Image');
var badge5Title1 = document.getElementById('badge5Title1');
var badge5Title2 = document.getElementById('badge5Title2');
var badge5Level = document.getElementById('badge5Level');
var badge6Cost = document.getElementById('badge6Cost');
var badge6Image = document.getElementById('badge6Image');
var badge6Title1 = document.getElementById('badge6Title1');
var badge6Title2 = document.getElementById('badge6Title2');
var badge6Level = document.getElementById('badge6Level');
var badge7Cost = document.getElementById('badge7Cost');
var badge7Image = document.getElementById('badge7Image');
var badge7Title1 = document.getElementById('badge7Title1');
var badge7Title2 = document.getElementById('badge7Title2');
var badge7Level = document.getElementById('badge7Level');
var badge8Cost = document.getElementById('badge8Cost');
var badge8Image = document.getElementById('badge8Image');
var badge8Title1 = document.getElementById('badge8Title1');
var badge8Title2 = document.getElementById('badge8Title2');
var badge8Level = document.getElementById('badge8Level');
var badge9Cost = document.getElementById('badge9Cost');
var badge9Image = document.getElementById('badge9Image');
var badge9Title1 = document.getElementById('badge9Title1');
var badge9Title2 = document.getElementById('badge9Title2');
var badge9Level = document.getElementById('badge9Level');
var badge10Cost = document.getElementById('badge10Cost');
var badge10Image = document.getElementById('badge10Image');
var badge10Title1 = document.getElementById('badge10Title1');
var badge10Title2 = document.getElementById('badge10Title2');
var badge10Level = document.getElementById('badge10Level');
var badge11Cost = document.getElementById('badge11Cost');
var badge11Image = document.getElementById('badge11Image');
var badge11Title1 = document.getElementById('badge11Title1');
var badge11Title2 = document.getElementById('badge11Title2');
var badge11Level = document.getElementById('badge11Level');
var badge12Cost = document.getElementById('badge12Cost');
var badge12Image = document.getElementById('badge12Image');
var badge12Title1 = document.getElementById('badge12Title1');
var badge12Title2 = document.getElementById('badge12Title2');
var badge12Level = document.getElementById('badge12Level');
var slotHinge = document.getElementById('slotHinge');
var slotChamber1 = document.getElementById('slotChamber1');
var slotChamber2 = document.getElementById('slotChamber2');
var slotChamber3 = document.getElementById('slotChamber3');
// Create the event for Bonus Round Manual Click
const eventManualClick = document.createEvent('Event');
// Define that the event name is 'build'.
eventManualClick.initEvent('click', true, true);
//max Char displayable numbers 100000000000
var goldTotalPostString = " Gold";
var currentGoldEarned = 0;
var currentGoldText = "0 Gold";
var currentGoldEarnedText = "+1 Gold";
var currentGhandsGoldEarnedText = "+1 Gold";
var gameDay = 1440; //1440 seconds or 24min
var gameHour = gameDay/24; //60 seconds or 1min
var gameMin = gameHour/60; //1 second
var gameSec = gameHour/60; //0.016 second
var levelindicators = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX"];
var sequence = [" First ", " Second ", " Third ", " Fourth ", " Fith ", " Sixth ", " Seventh ", " Eigth ", " Ninth ", " Tenth ", " Eleventh ", " Twelfth ", " Thirteenth ", " Fourteenth ", " Fifteenth ", " Sixteenth ", " Seventeenth ", " Eighteenth ", " Nineteenth ", " Twentieth "];
var dailyTimeNames = ["Sunrise", "Morning", "Noon", "Afternoon", "Sunset", "Evening", "Midnight", "Night"];
var dailyTimes = [6, 8, 11, 14, 18, 20, 0, 3];
var randomTimeListNames = ["Morning", "Afternoon", "Evening", "Night"];
var randomTimeList = [8, 14, 20, 3];
var events = ["High Noon", " Gold Coin Storm", "Genie Challenge", "Bonus Round", "Blue Moon", "Hades Prowl", "Cosmic Aurora"];
var currentEvent = "";
var eventActive = false;
var eventEndReady = false;
var currentEventEarnings = 0;
var currentEventEarningsPretty = "";
var lifetimeEventEarningsPretty = "";
var bonusMultipliers = [2,3,4,5,7];
var bonusMultipliers2 = [2,2,3,4,5];
var criticalChanceRate = [17, 24, 31, 38, 45];
var eventBonusChance1 = 0;
var eventBonusChance2 = 0;
var eventBonusChance3 = 0;
var eventCriticalHitRateIncrease = 0;
var eventCriticalRateIncrease = 0;
var eventBonusRateIncrease = 1;
var eventBonusInfoText = "";
var blankStart;
var eventTick = 0;
var eventTimeRemaining = 0;
var eventStartTime = 0;
var eventEndTime = 0;
var checkRoll = 0;
var rollCheck = false;
var checkRollghand1 = 0;
var rollCheckghand1 = false;
var checkRollghand2 = 0;
var rollCheckghand2 = false;
var checkRollghand3 = 0;
var rollCheckghand3 = false;
var eventRoll = 0;
var eventRollCheck = false;
var eventRollHades = 0;
var eventRollCheckHades = false;
var event1Chance = 0;
var event2Chance = 0;
var event3Chance = 0;
var event4Chance = 0;
var event5Chance = 0;
var event6Chance = 0;
var event7Chance = 0;
var event1ChanceBonus = 0;
var event2ChanceBonus = 0;
var event3ChanceBonus = 0;
var event4ChanceBonus = 0;
var event5ChanceBonus = 0;
var event6ChanceBonus = 0;
var event7ChanceBonus = 0;
var eventOrderSwitcher = 0;
var eventNums = [];
var eventNumsPos = [0, 1, 2, 3];
var eventRandomTimes;
var eventRandomNames;
var eventGoldCoinStormTime = 0;
var eventGoldCoinStormTimeName = "";
var eventGenieChallengeTime = 0;
var eventGenieChallengeTimeName = "";
var eventHadesProwlTime = 0;
var eventHadesProwlTimeName = "";
var currentEventTempClicks = 0;
var blueMoonTempClicks = 0;
var coinRain;
var coinArr = [];
var bonusSelect = 0;
var bonusSelectPretty = "";
var eventTimeout;
var eventTimeout2;
var eventInterval;
var resetEventNotification;
var animEndTime = 0;
let htmlGoldText;
let goldText;
let ghand1GoldEarnedText;
let ghand1CurrentGoldEarned;
let ghand2GoldEarnedText;
let ghand2CurrentGoldEarned;
let ghand3GoldEarnedText;
let ghand3CurrentGoldEarned;
let ghandsGoldEarnedTotal = 0;
let fiftyCentArray;
var endmsgText = "";
var usergpsnotifications = [usergoldpersecond, usergoldpersecond2, usergoldpersecond3, usergoldpersecond4, usergoldpersecond5, usergoldpersecond6, usergoldpersecond7, usergoldpersecond8, usergoldpersecond9, usergoldpersecond10, usergoldpersecond11, usergoldpersecond12];
var gpsnotificationstoggle = 0;
var notificationCrit = false;
var notificationCritGhand1 = false;
var notificationCritghand2 = false;
var notificationCritghand3 = false;
var htmlNotificationArray = [notification1, notification2, notification3, notification4, notification5, notification6, notification7, notification8, notification9, notification10, notification11, notification12];
var htmlNotificationTextArray = [notification1Text, notification2Text, notification3Text, notification4Text, notification5Text, notification6Text, notification7Text, notification8Text, notification9Text, notification10Text, notification11Text, notification12Text];
var htmlNotificationToggle = 0;
var ghandsNotificationText = "";
var betFor = 0;
var betForPretty = "";
var betBlind = 0;
var betAmount = 0;
var betAmountPretty = "";
var betWonAmount = 0;
var betWonAmountPretty = "";
var genieBetTextAll = "";
var betPercent = [0.15,0.20,0.25,0.30,0.35];
var betPercentPretty = [15,20,25,30,35];
var betDifficulty = [1.5,2.0,2.5,3.0,3.5];
var betDifficultyPretty = ["Cake","Easy","Medium","Hard","Xtreme"];
var challengeGoal = 0;
var challengeGoalText = "";
var challengeProgress = 0;
var challengeMet = false;
var bonusSwitcher = 0;
var bonusSwitcher2 = 0;
var bonus1Winnings = 0;
var bonus1WinningsPretty = 0;
var bonus2Winnings = 0;
var bonus2WinningsPretty = 0;
var bonus3Winnings = 0;
var bonus3WinningsPretty = 0;
var bonus4Winnings = 0;
var bonus4WinningsPretty = 0;
var bonus5Winnings = 0;
var bonus5WinningsPretty = 0;
var bonusWinnings = [];
var bonusWinningsPretty = [];
var bonusWin = [];
var bonusNums = [];
var bonusRoundButtons = [bonus1, bonus2, bonus3, bonus4, bonus5];
var bonusRoundTexts = [bonus1Text, bonus2Text, bonus3Text, bonus4Text, bonus5Text];
var blueMoonGoalPosts = [50, 150, 300, 500, 750, 1000];
var blueMoonGoals = [];
var blueMoonRewards = [];
var blueMoonRewardsType = [];
var blueMoonRewardUnlocked = 0;
var blueMoonRewardChance1 = 0.42;
var blueMoonWonDiscounts = 0;
var rewardStoreDiscount = 0.50;
var hadesGPS = 0;
var hadesGPSAdjustment = 0;
var hadesCritHit = 0;
var hadesCritRate = 0;
var hadesGoldTotal = 0;
var hadesGoldTotalPretty = "";
var hadesGoldBonus = 0;
var hadesGoldBonusPretty = "";
var hadesGoldBonusText = "";
var playerTotalSnapshot = 0;
var playerTotalSnapshotPretty = "";
var playerTotalEventEnd = 0;
var playerTotalEventEndPretty = "";
var hadesDefeated = false;
var notificationCritHades = false;
var hadesGPSQuarters = 0;
var hadesCurrentEarned = 0;
var hadesCurrentEarnedPretty = "";
var hadesCurrentEarnedText = "";
var hadesGPSTweak = 0;
var eventJustStarted = false;
var otherbonusButtonTimeout;
var eventEndReadyTimeout1;
var eventEndReadyTimeout2;
var eventEndReadyTimeout3;
var eventEndReadyTimeout4;
var bonusPick;
var fogColorRevert = "";
var currentCPSPretty;
var nextCPSPretty;
var badgePurchasePreText;
var badgeCurrentPreText;
var badgeCostID;
var badgeCostPretty;
var badgeTitle1ID;
var badgeTitle2ID;
var badgeLevelID;
var badgeLockID;
var badgeUnlockID;
var badgeUnlockMsgID;
var lockedMsgString;
var storeNextLevelCostPretty;
var notifAnimDelay;
var currentBadge;
var menuButtonToggle = 0; 
var storeNextBonusCost;
var storeNextLevelCost;
var totalCost = 0;
var lifetimeClicksHtmlPretty = "";
var nextLvlCostPretty = "";
var nextBonusCostPretty = "";
var useDiscount = 1;
var discountOnHalf = "off";
var discountOnFull = "off";
var storeDiscountHalf;
var storeDiscountFull;
var discountHalfToggle = true;
var discountFullToggle = true;
let newCost;
let addCommas;
let commaLength;
let decimal;
let decimalTemp;
let foundDecimal = -1;
let strLength;


//Event Object Support
//

//
//Genie Gloves - Tap Increase
var playerTapBadgeOn = false;
//Upgrade Costs
var playerTapBadgeBuyLevel = [25, 50, 100, 200, 300, 400, 500, 600, 800, 1000, 1300, 1600, 2000, 2400, 2800, 3400, 4100, 4900, 5800, 7000];
//New Clicks Per Second @ Lvls
var playerTapBadgelevels = [0.50, 0.75, 1, 2, 3, 4, 7, 11, 16, 22, 28, 36, 45, 54, 63, 72, 81, 90, 99, 111];

//Lucky Goldfish - Crit Hit and Rate Increase
var luckyGoldfishBadgeOn = false;
//Upgrade Costs
var luckyGoldfishBadgeBuyLevel = [1000, 5000, 15000, 30000, 50000];
//Crit Hit Increase
var luckyGoldfishBadgeBonus1 = [6,9,13,18,24];
//New Crit Rate
var luckyGoldfishBadgeBonus2 = [3,4,5,6,7];

//Genie Hand 1 Badge
var ghand1On = false;
//Temp Var to Set Aframe Anims
var ghand1Set = false;
//Upgrade Costs
var ghand1BuyLevel = [100, 200, 350, 750, 1500, 3000, 6000, 12500, 25000, 50000, 100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000, 1000000];
//Clicks Per Second @ Lvls
var ghand1levels = [0.25, 0.5, 1, 2, 4, 8, 16, 25, 50, 75, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

//
//Genie Hand 2 Badge
var ghand2On = false;
//Temp Var to Set Aframe Anims
var ghand2Set = false;
//Upgrade Costs
var ghand2BuyLevel = [100000, 200000, 375000, 750000, 1500000, 3000000, 6000000, 12500000, 25000000, 50000000, 100000000, 200000000, 300000000, 400000000, 500000000, 600000000, 700000000, 800000000, 900000000, 1000000000];
//Clicks Per Second @ Lvls
var ghand2levels = [100, 200, 375, 750, 1500, 3000, 6000, 12500, 25000, 50000, 100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000, 1000000];

//
//Genie Hand 3 Badge
var ghand3On = false;
//Temp Var to Set Aframe Anims
var ghand3Set = false;
//Upgrade Costs		100000000
var ghand3BuyLevel = [100000000, 200000000, 375000000, 750000000, 1500000000, 3000000000, 6000000000, 12500000000, 25000000000, 50000000000, 100000000000, 200000000000, 300000000000, 400000000000, 500000000000, 600000000000, 700000000000, 800000000000, 900000000000, 1000000000000];
//Clicks Per Second @ Lvls
var ghand3levels = [100000, 200000, 375000, 750000, 1500000, 3000000, 6000000, 12500000, 25000000, 50000000, 100000000, 200000000, 300000000, 400000000, 500000000, 600000000, 700000000, 800000000, 900000000, 1000000000];

//
//High Noon Event Badge
var highNoonBadgeOn = false;
//Upgrade Costs
var highNoonBadgeBuyLevel = [10000, 25000, 50000, 75000, 100000];
//Bonus 1 - Event Start Chance Increase
var highNoonBadgeBonus1 = [7,9,11,13,15];
//Bonus 2 - Event Increased Bonus for Player and Hands
var highNoonBadgeBonus2 = [2,3,4,5,7];

//
//Gold Coin Storm Event Badge
var goldCoinStormBadgeOn = false;
//Upgrade Costs
var goldCoinStormBadgeBuyLevel = [100000, 250000, 500000, 750000, 1000000];
//Bonus 1 - Event Start Chance Increase
var goldCoinStormBadgeBonus1 = [7,9,11,13,15];
//Bonus 2 - Event Increased Bonus for Player and Hands
var goldCoinStormBadgeBonus2 = [2,3,4,5,7];

//
//Genie Challenge Event Badge
var genieChallengeBadgeOn = false;
//Upgrade Costs
var genieChallengeBadgeBuyLevel = [1000000, 2500000, 5000000, 7500000, 10000000];
//Bonus 1 - Event Challenge Tap Total Reduction by %
var genieChallengeBadgeBonus1 = [5,10,15,20,25];
//Bonus 2 - Event Increased Bonus for Player and Hands
var genieChallengeBadgeBonus2 = [2,3,4,5,7];

//
//Bonus round Event Badge
var bonusRoundBadgeOn = false;
//Upgrade Costs
var bonusRoundBadgeBuyLevel = [10000000, 25000000, 50000000, 75000000, 10000000];
//Bonus 1 - Event Start Chance Increase
var bonusRoundBadgeBonus1 = [7,9,11,13,15];
//Bonus 2 - Event Increased Bonus for Player and Hands
var bonusRoundBadgeBonus2 = [2,3,4,5,7];

//
//Blue Moon Event Badge
var blueMoonBadgeOn = false;
//Upgrade Costs
var blueMoonBadgeBuyLevel = [100000000, 250000000, 500000000, 750000000, 1000000000];
//Bonus 1 - Event Click Reduction to Spawn Items
var blueMoonBadgeBonus1 = [5,10,15,20,25];
//Bonus 2 - Event Increased Bonus for Player and Hands
var blueMoonBadgeBonus2 = [2,3,4,5,7];

//
//Hades Prowl Event Badge
var hadesProwlBadgeOn = false;
//Upgrade Costs
var hadesProwlBadgeBuyLevel = [1000000000, 2500000000, 5000000000, 7500000000, 1000000000];
//Bonus 1 - Event Reduction in Enemy Gold Per Second by %
var hadesProwlBadgeBonus1 = [5,10,15,20,25];
//Bonus 2 - Event Increased Bonus for Player and Hands
var hadesProwlBadgeBonus2 = [2,3,4,5,7];

//
//Cosmic Aurora Event Badge
var cosmicAuroraBadgeOn = false;
//Upgrade Costs
var cosmicAuroraBadgeBuyLevel = [10000000000, 25000000000, 50000000000, 75000000000, 100000000000];
//Bonus 1 - Event Start Chance Increase
var cosmicAuroraBadgeBonus1 = [7,9,11,13,15];
//Bonus 2 - Event Increased Bonus for Player and Hands
var cosmicAuroraBadgeBonus2 = [2,3,4,5,7];

//#return
//
//Save File Data
//

//Time
//Switch minElapsed functional to inGameHourElapsed
var secElapsed = -1;//offset as the function runs at init
var minElapsed = -1;//offset as the function runs at init
var hourElapsed = 0;
var dayElapsed = 0;
var weekElapsed = 0;
var monthElapsed = 0;
var yearElapsed = 0;
var inGameMinElapsed = secElapsed;
var inGameHourElapsed = inGameMinElapsed/60;
var inGameDayElapsed = inGameHourElapsed/24; 
var inGameWeekElapsed = inGameDayElapsed/7; 
var inGameMonthElapsed = inGameWeekElapsed/28; 
var inGameYearElapsed = inGameMonthElapsed/365; 

//Player's Hoard
var goldTotal = 2151020;
console.log(goldTotal);
var playerHoldStoreDiscountHalf = 100;//TEMP
var playerHoldStoreDiscountFull = 100;//TEMP

//Event Objects
//

//
//High Noon
var highNoonEvent = {eventName: events[0], eventDailyTime: dailyTimes[2], eventDailyTimeName: dailyTimeNames[2], defaultChanceRate: 40, defaultEventLength: 75*gameMin, currentEventClicks: 0, lifetimeEventClicks: 0, lifetimeEventEarnings: 0};
//
//Gold Coin Storm
var goldCoinStormEvent = {eventName: events[1], eventDailyTime: blankStart, eventDailyTimeName: "Random", defaultChanceRate: 35, defaultEventLength: 75*gameMin, currentEventClicks: 0, lifetimeEventClicks: 0, lifetimeEventEarnings: 0};
//
//Genie Challenge
var genieChallengeEvent = {eventName: events[2], eventDailyTime: blankStart, eventDailyTimeName: "Random", defaultChanceRate: 25, defaultEventLength: 120*gameMin, currentEventClicks: 0, lifetimeEventClicks: 0, lifetimeEventEarnings: 0};
//
//Bonus Round
var bonusRoundEvent = {eventName: events[3], eventDailyTime: dailyTimes[0], eventDailyTimeName: dailyTimeNames[0], defaultChanceRate: 45, defaultEventLength: 45*gameMin, currentEventClicks: 0, lifetimeEventClicks: 0, lifetimeEventEarnings: 0};
//
//Blue Moon
var blueMoonEvent = {eventName: events[4], eventDailyTime: dailyTimes[6], eventDailyTimeName: dailyTimeNames[6], defaultChanceRate: 40, defaultEventLength: 90*gameMin, currentEventClicks: 0, lifetimeEventClicks: 0, lifetimeEventEarnings: 0};
//
//Hades Prowl
var hadesProwlEvent = {eventName: events[5], eventDailyTime: blankStart, eventDailyTimeName: "Random", defaultChanceRate: 20, defaultEventLength: 45*gameMin, currentEventClicks: 0, lifetimeEventClicks: 0, lifetimeEventEarnings: 0};
//
//Cosmic Aurora
var cosmicAuroraEvent = {eventName: events[6], eventDailyTime: dailyTimes[4], eventDailyTimeName: dailyTimeNames[4], defaultChanceRate: 30, defaultEventLength: 60*gameMin, currentEventClicks: 0, lifetimeEventClicks: 0, lifetimeEventEarnings: 0};
//
//Player Object
var player = {name: "Player", currentCPS: 0.25, criticalHitChance: 4, criticalHitRate: 2, criticalHits: 0, lifetimeClicks: 0, lifetimeClicksEarned: 0};


//Achievements
//
var achievementPlayerTapUnlock = true;//All these temp
var achievementLuckyGoldfishUnlock = true;
var achievementGenieHand1Unlock = true;
var achievementGenieHand2Unlock = true;
var achievementGenieHand3Unlock = true;
var achievementHighNoonUnlock = true;
var achievementGoldCoinStormUnlock = true;
var achievementGenieChallengeUnlock = true;
var achievementBonusRoundUnlock = true;
var achievementBlueMoonUnlock = true;
var achievementHadesProwlUnlock = true;
var achievementCosmicAuroraUnlock = true;

//Badges
//
//Genie Gloves Badge
var playerTapBadge = {name: "Genie Gloves Badge", currentLevel: 0, currentCPS: 0.50, nextLvlCost: 25, ownNext: " First ", buyLevels: playerTapBadgeBuyLevel, badgeLevels1: playerTapBadgelevels, owned: playerTapBadgeOn, maxLeveled: false, description: "A pair of magic gloves to help you be just a bit better at taping away at that magic coin.", unlocked: achievementPlayerTapUnlock, lockedMessage: "Earn 1 Gold to Unlock", animSet: false};

//Lucky Goldfish
var luckyGoldfishBadge = {name: "Lucky Goldfish Badge", currentLevel: 0, currentBonus1: 6, currentBonus2: 3, nextLvlCost: 1000, ownNext: " First ", buyLevels: luckyGoldfishBadgeBuyLevel, badgeLevels1: luckyGoldfishBadgeBonus1, badgeLevels2: luckyGoldfishBadgeBonus2, owned: luckyGoldfishBadgeOn, maxLeveled: false, description: "Genie's prized Lucky Goldfish for sale to help increase your luck at hitting it big while tapping away. ", unlocked: achievementLuckyGoldfishUnlock, lockedMessage: "Hit 7 Critical Hits within 1 minute.", animSet: false};

//Genie Hand 1
var ghand1Badge = {name: "Genie Hand 1", currentLevel: 0, currentCPS: 0.25, nextLvlCost: 100, ownNext: " First ", buyLevels: ghand1BuyLevel, badgeLevels1: ghand1levels, criticalHitChance: 7, criticalHitRate: 4, lifetimeCriticalHits: 0, lifetimeEarned: 0, lifetimeClicks: 0 , owned: ghand1On, maxLeveled: false, description: "Genie offers one of their uncoordinated hands to assist, for a fee of course. ", unlocked: achievementGenieHand1Unlock, lockedMessage: "Make your first purchase.", animSet: ghand1Set};

//Genie Hand 2
var ghand2Badge = {name: "Genie Hand 2", currentLevel: 0, currentCPS: 100, nextLvlCost: 100000, ownNext: " First ", buyLevels: ghand2BuyLevel, badgeLevels1: ghand2levels, criticalHitChance: 7, criticalHitRate: 3, lifetimeCriticalHits: 0, lifetimeEarned: 0, lifetimeClicks: 0 , owned: ghand2On, maxLeveled: false, description: "Genie offers one of their more dexterous hands to assist, for a moderate fee of course. ", unlocked: achievementGenieHand2Unlock, lockedMessage: "Purchase a Level I Genie Hand 1.", animSet: ghand2Set};

//Genie Hand 3
var ghand3Badge = {name: "Genie Hand 3", currentLevel: 0, currentCPS: 100000, nextLvlCost: 100000000, ownNext: " First ", buyLevels: ghand3BuyLevel, badgeLevels1: ghand3levels, criticalHitChance: 7, criticalHitRate: 4, lifetimeCriticalHits: 0, lifetimeEarned: 0, lifetimeClicks: 0 , owned: ghand3On, maxLeveled: false, description: "Genie offers one of their most talented hands to assist, for a huge fee of course. ", unlocked: achievementGenieHand3Unlock, lockedMessage: "Purchase a Level I Genie Hand 2.", animSet: ghand3Set};

//High Noon
var highNoonBadge = {name: "High Noon Badge", currentLevel: 0, currentBonus1: 7, currentBonus2: 2, nextLvlCost: 10000, ownNext: " First ", buyLevels: highNoonBadgeBuyLevel, badgeLevels1: highNoonBadgeBonus1, badgeLevels2: highNoonBadgeBonus2, lifetimeCriticalHits: 0, lifetimeEarned: 0, lifetimeClicks: 0, owned: highNoonBadgeOn, maxLeveled: false, description: "Increase Start Chance and Bonus Multiplier during Event", unlocked: achievementHighNoonUnlock, lockedMessage: "Complete this Event for the first time.", animSet: false};

//Gold Coin Storm
var goldCoinStormBadge = {name: "Gold Coin Storm Badge", currentLevel: 0, currentBonus1: 7, currentBonus2: 2, nextLvlCost: 100000, ownNext: " First ", buyLevels: goldCoinStormBadgeBuyLevel, badgeLevels1: goldCoinStormBadgeBonus1, badgeLevels2: goldCoinStormBadgeBonus2, lifetimeCriticalHits: 0, lifetimeEarned: 0, lifetimeClicks: 0, owned: goldCoinStormBadgeOn, maxLeveled: false, description: "Increase Start Chance and Bonus Multiplier during Event",  unlocked: achievementGoldCoinStormUnlock, lockedMessage: "Complete this Event for the first time.", animSet: false};

//Genie Challenge
var genieChallengeBadge = {name: "Genie Challenge Badge", currentLevel: 0, currentBonus1: 5, currentBonus2: 2, nextLvlCost: 1000000, ownNext: " First ", buyLevels: genieChallengeBadgeBuyLevel, badgeLevels1: genieChallengeBadgeBonus1, badgeLevels2: genieChallengeBadgeBonus2, lifetimeCriticalHits: 0, lifetimeEarned: 0, lifetimeClicks: 0, owned: genieChallengeBadgeOn, maxLeveled: false, description: "Reduce Tap Goal and Increase Bonus Multiplier during Event",  unlocked: achievementGenieChallengeUnlock, lockedMessage: "Complete this Event for the first time.", animSet: false};

//Bonus Round
var bonusRoundBadge = {name: "Bonus Round Badge", currentLevel: 0, currentBonus1: 7, currentBonus2: 2, nextLvlCost: 10000000, ownNext: " First ", buyLevels: bonusRoundBadgeBuyLevel, badgeLevels1: bonusRoundBadgeBonus1, badgeLevels2: bonusRoundBadgeBonus2, lifetimeCriticalHits: 0, lifetimeEarned: 0, lifetimeClicks: 0, owned: bonusRoundBadgeOn, maxLeveled: false, description: "Increase Start Chance and Bonus Multiplier during Event",  unlocked: achievementBonusRoundUnlock, lockedMessage: "Complete this Event for the first time.", animSet: false};

//Blue Moon
var blueMoonBadge = {name: "Blue Moon Badge", currentLevel: 0, currentBonus1: 5, currentBonus2: 2, nextLvlCost: 100000000, ownNext: " First ", buyLevels: blueMoonBadgeBuyLevel, badgeLevels1: blueMoonBadgeBonus1, badgeLevels2: blueMoonBadgeBonus2, lifetimeCriticalHits: 0, lifetimeEarned: 0, lifetimeClicks: 0, owned: blueMoonBadgeOn, maxLeveled: false, description: "Reduce Tap Goals for Rewards and Increase Bonus Multiplier during Event",  unlocked: achievementBlueMoonUnlock, lockedMessage: "Complete this Event for the first time.", animSet: false};

//Hades Prowl
var hadesProwlBadge = {name: "Hades Prowl Badge", currentLevel: 0, currentBonus1: 5, currentBonus2: 2, nextLvlCost: 1000000000, ownNext: " First ", buyLevels: hadesProwlBadgeBuyLevel, badgeLevels1: hadesProwlBadgeBonus1, badgeLevels2: hadesProwlBadgeBonus2, lifetimeCriticalHits: 0, lifetimeEarned: 0, lifetimeClicks: 0, owned: hadesProwlBadgeOn, maxLeveled: false, description: "Reduce Hades Gold Per Second and Increase Bonus Multiplier during Event",  unlocked: achievementHadesProwlUnlock, lockedMessage: "Complete this Event for the first time.", animSet: false};

//Cosmic Aurora
var cosmicAuroraBadge = {name: "Cosmic Aurora Badge", currentLevel: 0, currentBonus1: 7, currentBonus2: 2, nextLvlCost: 10000000000, ownNext: " First ", buyLevels: cosmicAuroraBadgeBuyLevel, badgeLevels1: cosmicAuroraBadgeBonus1, badgeLevels2: cosmicAuroraBadgeBonus2, lifetimeCriticalHits: 0, lifetimeEarned: 0, lifetimeClicks: 0, owned: cosmicAuroraBadgeOn, maxLeveled: false, description: "Increased Start Chance and Bonus Multiplier during Event",  unlocked: achievementCosmicAuroraUnlock, lockedMessage: "Complete this Event for the first time.", animSet: false};

//
//Special
//Coins that do special things, like change colors, add anims, swap models, change effects, etc...
//var special = {};

//
//All Badges
var allBadges = [playerTapBadge, luckyGoldfishBadge, ghand1Badge, ghand2Badge, ghand3Badge, highNoonBadge, goldCoinStormBadge, genieChallengeBadge, bonusRoundBadge, blueMoonBadge, hadesProwlBadge, cosmicAuroraBadge];



//
//Functions
//



//Events
//An animation needs to play each time a decision if an event will be played or not. Use a slot machine analogy on screen to display success/fail results.


//Event 1
//High Noon Event
function eventHighNoon() {
//Player and AC's Critical Hit Chance and Rate Increase

//Testing
console.log('High Noon Event');

//Set High Noon as current event
currentEvent = highNoonEvent.eventName;
eventActive = true;

eventStartTime = 0;
eventEndTime = highNoonEvent.defaultEventLength * 1000;
eventTimeRemaining = highNoonEvent.defaultEventLength;

eventBonusChance1 = Math.floor(Math.random()*5);
eventBonusChance2 = Math.floor(Math.random()*5);


eventCriticalHitRateIncrease = criticalChanceRate[eventBonusChance1];
eventCriticalRateIncrease = bonusMultipliers[eventBonusChance2];

//Player Badge Upgrade
if(allBadges[5].owned){
eventBonusRateIncrease *= allBadges[5].currentBonus2;

//Event Bonus Info
eventline4.innerHTML = "Bonus " + eventBonusRateIncrease + "x";
console.log('owned hit');
}

//Player Add up to Bonus
//eventBonusInfoText = "Critical Hit Rate to " + (eventCriticalHitRateIncrease + player.criticalHitRate) + "%  , Multiplier to x" + (player.criticalHitRate + eventCriticalRateIncrease);

//Event Bonus Info
eventBonusInfoText = "Critical Hit Up +" + eventCriticalHitRateIncrease + "% & Rate Up +" + eventCriticalRateIncrease + "x";
//
//Set Bonus Info to the Scene
eventbonustext.innerHTML = eventBonusInfoText;

//Set Event Description
eventline3.innerHTML = "The Sun Radiates Gold!";

//Scene Animation - Needs anim to be dynamic
directionalLight.emit('eventHighNoon',{});
sunback.emit('eventHighNoon',{});

//Event End Timer
eventTimeout = setTimeout(function () {
//Event End
eventEnd(highNoonEvent);
}, eventEndTime); //Delay

//Event Interval - Update HTML
eventInterval = setInterval(function() {

	//Pretify the Number
	currentEventEarningsPretty = prettyNums(currentEventEarnings, true, true).join('').trim();

	//Calc Remaining Time and Display, do not let go below 0
	eventTimeRemaining--; 
	if(eventTimeRemaining < 0){
		eventTimeRemaining = 0
	}

	eventline2.innerHTML = "Time Remaining : " + eventTimeRemaining + " seconds";
	eventgoldcountertext.innerHTML = currentEventEarningsPretty + " : Event Gold";//$1,000,000,000 Gold

}, 1000); //Interval

//User Guide Description :
//During High Noon time, when the sun is in the highest area of the sky, there is a chance the Genie will grant the player with the High Noon Bonus. The High Noon Bonus will dramatically increase the critical hit chance and rate for the player and autoclickers for a short period of time.

//End Event 1
};


//Event 2
//Gold Coin Storm
function eventGoldCoinStorm() {
//Player and AC get a Bonus Modifier to their Click Rates

//Testing
console.log('Gold Coin Storm Event');

//Set Gold Coin Storm as current event
currentEvent = goldCoinStormEvent.eventName;
eventActive = true;

eventStartTime = 0;
eventEndTime = goldCoinStormEvent.defaultEventLength * 1000;
eventTimeRemaining = goldCoinStormEvent.defaultEventLength;

eventBonusChance1 = Math.floor(Math.random()*5);

eventBonusRateIncrease = bonusMultipliers2[eventBonusChance1];

//Player Badge Upgrade
if(allBadges[6].owned){
eventBonusRateIncrease *= allBadges[6].currentBonus2;
}

//Event Bonus Info
eventBonusInfoText = "Event Multiplier " + eventBonusRateIncrease + "x";

//
//Set Bonus Info to the Scene
eventbonustext.innerHTML = eventBonusInfoText;

//Set Event Description
eventline3.innerHTML = "It's Raining Gold Coins!";

//Day
if(minElapsed >=6 && minElapsed <=16){
fogColorRevert = "#E27802";
} else if(minElapsed <6 || minElapsed >16) {
fogColorRevert = "#99154E";
} else {
fogColorRevert = "#E27802";
}


//Custom anim to event duration
animEndTime = eventEndTime - 10000;
sceneEl.setAttribute('animation__fogevent2',{dur: eventEndTime});
sceneEl.setAttribute('animation__fogevent3',{delay: eventEndTime + 5000});
sceneEl.setAttribute('animation__foggolccoinraincolor3',{to: eventEndTime + 5000});

//Scene Animation : Coins falling like rain
sceneEl.emit('eventGoldCoinStorm',{});


//Current Pool Size 42
for (let i = 0; i < 42; i++){

//Create individual Entity for each particle
coinRain = document.createElement('a-entity');
coinRain.classList.add("coinstorm");
coinRain.setAttribute('mixin','fallingCoin');

//Set Element random starting Position
let posX = Math.random() * 100 - 50;
let posY = 50;
let posZ = Math.random() * 100 - 50;
coinRain.setAttribute('position', {x: posX, y: posY, z: posZ});
//Set Element random Scale
let randomScale = Math.random() * 1 + 0.5;
coinRain.setAttribute('scale', {x: randomScale , y: randomScale, z: randomScale});

//set material to 1 of 4 gold colors
let randomGold = "";
let random3 = 0;
random3 = Math.floor(Math.random() * 4);
if(random3 === 0){
randomGold = "#F0A500";
} else if(random3 === 1){
randomGold = "#F88F01";
} else if(random3 === 2){
randomGold = "#E27802";
} else if(random3 === 3){
randomGold = "#CF7500";
} else {
randomGold = "#F0A500";
}
coinRain.setAttribute('material',{color:randomGold});

//Set a random delay for the anim
let random1000s = 0;
random1000s = (Math.random() * 1.5)*1000;
coinRain.setAttribute('animation__falling',{delay:random1000s});

//Add to Scene and array
coinArr.push(coinRain);
sceneEl.appendChild(coinArr[i]);
}

//Event End Timer
eventTimeout = setTimeout(function () {
//Event End
eventEnd(goldCoinStormEvent);

//Return them back to the pool
//Current Pool Size 150
for (let j = 0; j < coinArr.length; j++){

sceneEl.removeChild(coinArr[j]);

}
//Empty Array for Next Event Occurence
coinArr = [];

}, eventEndTime); //Delay

//Event Interval - Update HTML
eventInterval = setInterval(function() {

	//Pretify the Number
	currentEventEarningsPretty = prettyNums(currentEventEarnings, true, true).join('').trim();

	//Calc Remaining Time and Display, do not let go below 0
	eventTimeRemaining--; 
	if(eventTimeRemaining < 0){
		eventTimeRemaining = 0
	}
	eventline2.innerHTML = "Time Remaining : " + eventTimeRemaining + " seconds";
	eventgoldcountertext.innerHTML = currentEventEarningsPretty + " : Event Gold";//$1,000,000,000 Gold

}, 1000); //Interval

//End Event 2
};


//Event 3
//Rival Genie Challenge
function eventGenieChallenge() {
//The genie gets bored and bets you to a competition

//Testing
console.log('Genie Challenge Event');

//Set Rival Genie Challenge as current event
currentEvent = genieChallengeEvent.eventName;
eventActive = true;

//Event Info
eventStartTime = 0;
eventEndTime = genieChallengeEvent.defaultEventLength * 1000;
eventTimeRemaining = genieChallengeEvent.defaultEventLength;

//Holds betPercent choosen
betFor = 0;
betForPretty = "";
//Holds betDifficulty bet
betBlind = 0;
//Holds total bet amount
betAmount = 0;
betAmountPretty = "";
betWonAmount = 0;
betWonAmountPretty = "";
genieBetTextAll = "";
challengeGoal = 0;
challengeGoalText = "";
challengeProgress = 0;
challengeMet = false;

//Challenge, do at least X amount of taps.
eventBonusChance1 = Math.floor(Math.random()*5);
eventBonusChance2 = Math.floor(Math.random()*5);
betFor = betPercent[eventBonusChance1];
betForPretty = betPercentPretty[eventBonusChance1];
while(eventBonusChance2 > eventBonusChance1){
	eventBonusChance2 = Math.floor(Math.random()*4);
}

betBlind = betDifficulty[eventBonusChance2];
betAmount = Math.floor(goldTotal * betFor);
//send betAmount to the negative $ notification that is used in the store
goldTotal -= betAmount;



//Challenge - Total Clicks
challengeGoal = betBlind * genieChallengeEvent.defaultEventLength;

if(allBadges[7].owned){
//Convert num to decimal and deduct that amount from the goal
challengeGoal -= (challengeGoal * (genieChallengeBadge.currentBonus1 / 100));
}

//Tap Clicks
challengeGoalText = " Taps!";

//Event Bonus Info
betAmountPretty = prettyNums(betAmount, true, true).join('').trim();
eventBonusInfoText = "Bet Deducted " + betForPretty + "%" + ": " + betAmountPretty + " | Win " + betBlind + "x";
//Notify Player
eventRewardHtmlUpdate(betAmountPretty, false);
//
//Set Bonus Info to the Scene
eventbonustext.innerHTML = eventBonusInfoText;

//Set Event Description
//Challenge
eventline3.innerHTML = "Beat " + challengeGoal + challengeGoalText;
eventline4.innerHTML = "Level : " + betDifficultyPretty[eventBonusChance2];

//Player Badge Upgrade
if(allBadges[7].owned){
eventline4.innerHTML = "Level : " + betDifficultyPretty[eventBonusChance2 + " | Bonus " + allBadges[7].currentBonus2 + "x"];
}

//Scene Animation : More Genie anims?
//He shit talks you
//And is upset when he looses

//A-Frame Bet Text Update
genieBetTextAll = "Bet : " + betAmountPretty + " Gold";
genieBetText.setAttribute('text',{value: genieBetTextAll});
genieBetText.setAttribute('visible','true');
genieBetText.emit('eventChallengeStart',{});





//Event End Timer
eventTimeout = setTimeout(function () {

//Challenges - Need 2nd and 3rd Challenge
//Challenge 1
//If user was able to click >= to the goal amount
//They are rewarded with the bet taken from them times betDifficulty
if (challengeProgress >= challengeGoal){
challengeMet = true;
betWonAmount = betAmount * betBlind;

//Prettify Amount
betWonAmountPretty = prettyNums(betWonAmount, true, true).join('').trim();

} else {

//Prettify Amount
betAmountPretty = prettyNums(betAmount, true, true).join('').trim();
}

genieBetText.emit('eventChallengeEnd',{});

//Event End
eventEnd(genieChallengeEvent);
}, eventEndTime); //Delay

//Event Interval - Update HTML
eventInterval = setInterval(function() {

	//Calc Remaining Time and Display, do not let go below 0
	eventTimeRemaining--; 
	if(eventTimeRemaining < 0){
		eventTimeRemaining = 0
	}
	eventline2.innerHTML = "Time Remaining : " + eventTimeRemaining + " seconds";

	//Depending on the Challenge, update ticker with player info like click amount
	//Pretify the Number
	//currentEventEarningsPretty = prettyNums(currentEventEarnings, true, true).join('').trim();
	eventgoldcountertext.innerHTML = challengeProgress + " / " + challengeGoal + " Taps";

}, 1000); //Interval


//End Event 3
};


//
//Prevent Player from clicking multiple Selections
function disableBonusRoundButtons() {
bonus1.style.setProperty('pointer-events', 'none');
bonus2.style.setProperty('pointer-events', 'none');
bonus3.style.setProperty('pointer-events', 'none');
bonus4.style.setProperty('pointer-events', 'none');
bonus5.style.setProperty('pointer-events', 'none');
};


//Event 4
//Bonus Round
function eventBonusRound() {
//Pure free money bonus round, allowing the player to win small, medium, big or huge.
//The user is given 5 HTML options to choose from
//they choose 1, the user's choice flips and the reward is given
//then all the other flip over showing their rewards
//if no user interaction, 1 of the 5 will randomly be choosen

//Scene Animation : Use a scratch lottery like card that the user can select and it will also display the results of winnings wether small, medium, big or huge.

//Testing
console.log('Bonus Round Event');

//Set Bonus Round as current event
currentEvent = bonusRoundEvent.eventName;
eventActive = true;

//Event Info
eventStartTime = 0;
eventEndTime = bonusRoundEvent.defaultEventLength * 1000;
eventTimeRemaining = bonusRoundEvent.defaultEventLength;

bonusSwitcher = 0;
bonusSwitcher2 = 0;
bonusSelect = 0;
bonusSelectPretty = "";
bonus1Winnings = 0;
bonus1WinningsPretty = "";
bonus2Winnings = 0;
bonus2WinningsPretty = "";
bonus3Winnings = 0;
bonus3WinningsPretty = "";
bonus4Winnings = 0;
bonus4WinningsPretty = "";
bonus5Winnings = 0;
bonus5WinningsPretty = "";

bonusWin = [];
bonusNums = [];
bonusWinnings = [];
bonusWinningsPretty = [];
bonusWin = [0.15,0.20,0.25,0.30,0.35];



for(let i = bonusWin.length; i > 0 ; i--){
//Choose a random selection up to iterate for the bonus # and winning amount
bonusSwitcher = Math.floor(Math.random()*i);
//Assign to perm array random bonus # with random amount
bonusNums.push(bonusWin[bonusSwitcher]);
//Remove from both temp arrays
bonusWin.splice(bonusSwitcher,1);
}

//Random from 0 to 4, 5 length of array
bonusSwitcher2 = Math.floor(Math.random()*5);
bonus1Winnings = bonusNums[bonusSwitcher2];
bonusNums.splice(bonusSwitcher2,1);

//Random from 0 to 3, 4 length of array
bonusSwitcher2 = Math.floor(Math.random()*4);
bonus2Winnings = bonusNums[bonusSwitcher2];
bonusNums.splice(bonusSwitcher2,1);

//Random from 0 to 2, 3 length of array
bonusSwitcher2 = Math.floor(Math.random()*3);
bonus3Winnings = bonusNums[bonusSwitcher2];
bonusNums.splice(bonusSwitcher2,1);

//Random from 0 to 1, 2 length of array
bonusSwitcher2 = Math.floor(Math.random()*2);
bonus4Winnings = bonusNums[bonusSwitcher2];
bonusNums.splice(bonusSwitcher2,1);

//Last but not least
bonus5Winnings = bonusNums[0];

//randomly grab each of the 5 in this array
//Calc possible winning rewards
bonus1Winnings = Math.floor(bonus1Winnings *= goldTotal);
bonus2Winnings = Math.floor(bonus2Winnings *= goldTotal);
bonus3Winnings = Math.floor(bonus3Winnings *= goldTotal);
bonus4Winnings = Math.floor(bonus4Winnings *= goldTotal);
bonus5Winnings = Math.floor(bonus5Winnings *= goldTotal);

//Check if player owns coin and add bonus if so
if(allBadges[8].owned){
   bonus1Winnings *= allBadges[8].currentBonus2;
   bonus2Winnings *= allBadges[8].currentBonus2;
   bonus3Winnings *= allBadges[8].currentBonus2;
   bonus4Winnings *= allBadges[8].currentBonus2;
   bonus5Winnings *= allBadges[8].currentBonus2;
}

//Prettify Amount
bonus1WinningsPretty = prettyNums(bonus1Winnings, true, false).join('').trim();
bonus2WinningsPretty = prettyNums(bonus2Winnings, true, false).join('').trim();
bonus3WinningsPretty = prettyNums(bonus3Winnings, true, false).join('').trim();
bonus4WinningsPretty = prettyNums(bonus4Winnings, true, false).join('').trim();
bonus5WinningsPretty = prettyNums(bonus5Winnings, true, false).join('').trim();

//Add Completed numbers to Arrays
bonusWinnings.push(bonus1Winnings);
bonusWinnings.push(bonus2Winnings);
bonusWinnings.push(bonus3Winnings);
bonusWinnings.push(bonus4Winnings);
bonusWinnings.push(bonus5Winnings);
bonusWinningsPretty.push(bonus1WinningsPretty);
bonusWinningsPretty.push(bonus2WinningsPretty);
bonusWinningsPretty.push(bonus3WinningsPretty);
bonusWinningsPretty.push(bonus4WinningsPretty);
bonusWinningsPretty.push(bonus5WinningsPretty);

//Set Event Description
//Challenge 1
eventline3.innerHTML = "Reward! Pick any 1!";
eventgoldcountertext.innerHTML = "?????";
eventbonustext.innerHTML =  "Reward! Pick any 1!";

//Player Badge Upgrade
if(allBadges[8].owned){
eventline4.innerHTML = "Bonus " + allBadges[8].currentBonus2 + "x";
}

//bonusRoundScreen
//set display to block
bonusRoundScreen.style.setProperty('display', 'block');
//Play Opac in for screen
//Make the CSS Animation Repeat
bonusRoundScreen.classList.remove("event-anim-opac-out");
bonusRoundScreen.classList.remove("event-anim-opac-in");
void bonusRoundScreen.offsetWidth;
bonusRoundScreen.classList.add("event-anim-opac-in");

//Need to enable pointer-events and disable them afterwards
bonus1.style.setProperty('pointer-events', 'auto');
bonus2.style.setProperty('pointer-events', 'auto');
bonus3.style.setProperty('pointer-events', 'auto');
bonus4.style.setProperty('pointer-events', 'auto');
bonus5.style.setProperty('pointer-events', 'auto');

//Listen for click or timeout

//Event Interval - Update HTML
eventInterval = setInterval(function() {

	//Calc Remaining Time and Display, do not let go below 0
	eventTimeRemaining--; 
	if(eventTimeRemaining < 0){
		eventTimeRemaining = 0
	}
	eventline2.innerHTML = "Time Remaining : " + eventTimeRemaining + " seconds";

	if(eventEndReady){
		bonusRoundEnd();
	} else if (eventTimeRemaining === 0) {
		//if selection has not been chosen, randomly choose 1
		if (bonusSelect === 0) {
			bonusSwitcher = Math.floor(Math.random()*(bonusRoundButtons.length));
			if(bonusSwitcher === 0){
				bonus1.dispatchEvent(eventManualClick,{});
			} else if(bonusSwitcher === 1){
				bonus2.dispatchEvent(eventManualClick,{});
			} else if(bonusSwitcher === 2){
				bonus3.dispatchEvent(eventManualClick,{});
			} else if(bonusSwitcher === 3){
				bonus4.dispatchEvent(eventManualClick,{});
			} else if(bonusSwitcher === 4){
				bonus5.dispatchEvent(eventManualClick,{});
			}
		}

	}
}, 1000); //Interval



};


//
//Bonus Round Event Selection & Reward
function bonusClick(bonusSelected, userClicked){

bonusPick = bonusSelected - 1;//offset for array storage

//Disable all other button clicks
disableBonusRoundButtons();

//arrays
//bonusRoundButtons
//bonusRoundTexts
//bonusWinnings
//bonusWinningsPretty
//console.log(bonusSelected);
//console.log(bonusPick);
//console.log(bonusWinnings[bonusPick]);
//console.log(bonusSelect);
//console.log(bonusWinningsPretty[bonusPick]);
//console.log(bonusSelectPretty);

//Assign Selection
bonusSelect = bonusWinnings[bonusPick];
bonusSelectPretty = bonusWinningsPretty[bonusPick];

console.log(bonusSelect);
console.log(bonusSelectPretty);

bonusRoundButtons[bonusPick].classList.remove("event-anim-bonus-reveal");
//bonusRoundTexts[bonusPick].classList.remove("event-anim-bonus-reveal-content");
void bonusRoundButtons[bonusPick].offsetWidth;
//void bonusRoundTexts[bonusPick].offsetWidth;
bonusRoundButtons[bonusPick].classList.add("event-anim-bonus-reveal");
//bonusRoundTexts[bonusPick].classList.add("event-anim-bonus-reveal-content");

//Set Bonus Text
bonusRoundTexts[bonusPick].style.setProperty('font-size', '5vh');
bonusRoundTexts[bonusPick].style.setProperty('line-height', '8vh');
bonusRoundTexts[bonusPick].style.setProperty('padding-top', '25%');
//bonusRoundTexts[bonusPick].classList.add("bonus-reveal-text");
//Set Bonus Text
bonusRoundTexts[bonusPick].innerHTML = bonusWinningsPretty[bonusPick];

//Set Side Pop Up Info
eventgoldcountertext.innerHTML = "+" + bonusSelectPretty;
eventbonustext.innerHTML =  "Congrats!";

currentEventEarnings = bonusSelect;
bonusRoundEvent.lifetimeEventEarnings += bonusSelect;

eventRewardHtmlUpdate(bonusSelectPretty, true);

goldTotal += bonusSelect;

//Timeout and Interval
otherbonusButtonTimeout = setTimeout(function () {

//Loop through buttons, skip button selected, and add need anim/info
for(let i=0; i< bonusRoundButtons.length; i++){

if(i === bonusPick){
//skip bonus choosen
} else {
//Set Bonus Text
bonusRoundTexts[i].style.setProperty('font-size', '5vh');
bonusRoundTexts[i].style.setProperty('line-height', '8vh');
bonusRoundTexts[i].style.setProperty('padding-top', '25%');
bonusRoundButtons[i].classList.remove("event-anim-bonus-reveal");
bonusRoundTexts[i].classList.add("bonus-reveal-text");
bonusRoundTexts[i].innerHTML = bonusWinningsPretty[i];
void bonusRoundButtons[i].offsetWidth;
bonusRoundButtons[i].classList.add("event-anim-bonus-reveal");
}
}
if (userClicked === true){

}
	//Timeout and Interval
	eventEndReadyTimeout1 = setTimeout(function () {

		//Fade Out Main Event Screen
		eventNotification.classList.remove("event-anim");
		eventNotification.classList.remove("event-anim-opac-out");
		eventNotification.classList.remove("event-end-anim");
		void eventNotification.offsetWidth;
		eventNotification.classList.add("event-anim-opac-out");

		//Timeout and Interval
		eventEndReadyTimeout2 = setTimeout(function () {

		//Fade Event Bonus Screen Out
		bonusRoundScreen.classList.remove("event-anim-opac-out");
		bonusRoundScreen.classList.remove("event-anim-opac-in");
		void bonusRoundScreen.offsetWidth;
		bonusRoundScreen.classList.add("event-anim-opac-out");

		}, 1000); //Delay

		//Timeout and Interval
		eventEndReadyTimeout3 = setTimeout(function () {
			//Event End Flagged
			eventEndReady = true;

		eventbonusnotification.classList.remove("event-anim-opac");
		eventbonusnotification.classList.remove("event-anim-opac-out");
		void eventbonusnotification.offsetWidth;
		eventbonusnotification.classList.add("event-anim-opac-out");

		//Timeout and Interval
		eventEndReadyTimeout4 = setTimeout(function () {

		//Fade Out Bonus Pop Up Screens
		eventgoldcounter.classList.remove("event-anim-opac");
		eventgoldcounter.classList.remove("event-anim-opac-out");
		void eventgoldcounter.offsetWidth;
		eventgoldcounter.classList.add("event-anim-opac-out");

		}, 1000); //Delay

		}, 3000); //Delay

	}, 4000); //Delay
}, 2000); //Delay
//After 3-4 seconds fade in the other 4 options and add amount to goldTotal

//After 3-4 more seconds fade out

//event over, reset



};


//
//Specific Event End for Bonus Round
function bonusRoundEnd(){


//Event End
eventEnd(bonusRoundEvent);

//Event End Timer
eventTimeout2 = setTimeout(function () {

//set display to none after fade out
bonusRoundScreen.style.setProperty('display', 'none');

//Reset Buttons
for (let i = 0;i < bonusRoundButtons.length; i++){
bonusRoundTexts[i].classList.remove("bonus-reveal-text");
bonusRoundButtons[i].classList.remove("event-anim-bonus-reveal");
bonusRoundTexts[i].innerHTML = "?";
bonusRoundTexts[i].style.setProperty('font-size', '15vh');
bonusRoundTexts[i].style.setProperty('line-height', '20vh');
bonusRoundTexts[i].style.setProperty('padding-top', '0');
}

}, 5000); //Delay
}


//Event 5
//Blue Moon
function eventBlueMoon() {
//Store Discount Time Period. Chance for clicks to drop a big Store Discount Coupon (Max hold 1, just next thing you buy is X% off but can earn mulitple in 1 event if used right away), an Upgrade, a Badge, a Special, other

//Testing
console.log('Blue Moon Event');

//Set Bonus Round as current event
currentEvent = blueMoonEvent.eventName;
eventActive = true;


//Event Info
eventStartTime = 0;
eventEndTime = blueMoonEvent.defaultEventLength * 1000;
eventTimeRemaining = blueMoonEvent.defaultEventLength;
blueMoonTempClicks = 0;
eventBonusChance1 = 0;
eventBonusChance2 = 0;
eventCriticalHitRateIncrease = 0;
eventCriticalRateIncrease = 0;
eventBonusRateIncrease = 1;
eventBonusInfoText = "";
reward1 = bonusMultipliers2;
reward2 = criticalChanceRate;
reward3 = bonusMultipliers;
blueMoonGoalPosts = [50, 150, 250, 400, 500, 700];
blueMoonGoals = blueMoonGoalPosts;
blueMoonRewards = [];
blueMoonRewardsType = [];
blueMoonRewardUnlocked = 0;
blueMoonRewardChance1 = 42;
blueMoonWonDiscounts = 0;
//Chances
//Discount Ticket 42%
//Mulit 17%
//Crit Hit 17%
//Crit Rate 17%


//Clicks for rewards, add up to +-10%
for(let j = 0; j < blueMoonGoalPosts.length; j++){
blueMoonGoals[j] += Math.floor(Math.random()*20)-10;
if(allBadges[9].owned){
blueMoonGoals[j] -= (blueMoonGoals[j] * (allBadges[9].currentBonus1/100));
}

}

//Pick and hold 6 random rewards
for (let i = 0; i < 6; i++) {
//Hit Discount Ticket @ 
if(checkChanceRollUser(blueMoonRewardChance1)){
//Add Discount ticket to reward array
blueMoonRewards.push(rewardStoreDiscount);
blueMoonRewardsType.push("discount");
} else {

//check 1 of the 3
eventBonusChance1 = Math.floor(Math.random() * 3);
eventBonusChance2 = Math.floor(Math.random() * 5);

if(eventBonusChance1 === 0){
//Add Click Multiplier to reward array
blueMoonRewards.push(reward1[eventBonusChance2]);
blueMoonRewardsType.push("clickmult");
} else if(eventBonusChance1 === 1){
//Add Crit Hit Increase to reward array
blueMoonRewards.push(reward2[eventBonusChance2]);
blueMoonRewardsType.push("crithit");
} else if(eventBonusChance1 === 2){
//Add Crit Rate Increase to reward array
blueMoonRewards.push(reward3[eventBonusChance2]);
blueMoonRewardsType.push("critrate");
}

}

}

console.log(blueMoonRewards);
console.log(blueMoonGoals);

//Scene Animation
moonLight.emit('eventBlueMoon',{});
moonback.emit('eventBlueMoon',{});
sceneEl.emit('eventBlueMoon',{});


//Player Badge Upgrade
if(allBadges[9].owned){
eventline4.innerHTML = "Reward Goals -" + allBadges[9].currentBonus1 + "% | Bonus " + allBadges[9].currentBonus2 + "x";
}


//Event End Timer
eventTimeout = setTimeout(function () {

//Event End
eventEnd(blueMoonEvent);
}, eventEndTime); //Delay

//Event Interval - Update HTML
eventInterval = setInterval(function() {

	//Calc Remaining Time and Display, do not let go below 0
	eventTimeRemaining--; 
	if(eventTimeRemaining < 0){
		eventTimeRemaining = 0
	}
	eventline2.innerHTML = "Time Remaining : " + eventTimeRemaining + " seconds";

	//Set Event Description
	eventline3.innerHTML = "Discount Tickets Won : #" + blueMoonWonDiscounts;

	//Pretify the Number
	currentEventEarningsPretty = prettyNums(currentEventEarnings, true, true).join('').trim();

	eventgoldcountertext.innerHTML = currentEventEarningsPretty + " : Event Gold";

	//Event Bonus Info
	eventBonusInfoText = "Mult Up +" + eventBonusRateIncrease + "x | " + "Crit Hit Up +" + eventCriticalHitRateIncrease + "% | Crit Rate Up +" + eventCriticalRateIncrease + "x";

	eventbonustext.innerHTML = eventBonusInfoText ;

	blueMoonClickCheck()

	//console.log(blueMoonTempClicks);

}, 1000); //Interval




};


//
//Check during clicks to see if reward is given
function blueMoonClickCheck(){
//blueMoonTempClicks
if (blueMoonRewardUnlocked === 0 && blueMoonTempClicks >= blueMoonGoals[0]) {
console.log('Tier 1 hit');
blueMoonRewardAccept(blueMoonRewards[0], blueMoonRewardsType[0])
blueMoonRewardUnlocked++;
} else if (blueMoonRewardUnlocked === 1 && blueMoonTempClicks >= blueMoonGoals[1]) {
console.log('Tier 2 hit');
blueMoonRewardAccept(blueMoonRewards[1], blueMoonRewardsType[1])
blueMoonRewardUnlocked++;
} else if (blueMoonRewardUnlocked === 2 && blueMoonTempClicks >= blueMoonGoals[2]) {
console.log('Tier 3 hit');
blueMoonRewardAccept(blueMoonRewards[2], blueMoonRewardsType[2])
blueMoonRewardUnlocked++;
} else if (blueMoonRewardUnlocked === 3 && blueMoonTempClicks >= blueMoonGoals[3]) {
console.log('Tier 4 hit');
blueMoonRewardAccept(blueMoonRewards[3], blueMoonRewardsType[3])
blueMoonRewardUnlocked++;
} else if (blueMoonRewardUnlocked === 4 && blueMoonTempClicks >= blueMoonGoals[4]) {
console.log('Tier 5 hit');
blueMoonRewardAccept(blueMoonRewards[4], blueMoonRewardsType[4])
blueMoonRewardUnlocked++;
} else if (blueMoonRewardUnlocked === 5 && blueMoonTempClicks >= blueMoonGoals[5]) {
console.log('Tier 6 hit');
blueMoonRewardAccept(blueMoonRewards[5], blueMoonRewardsType[5])
blueMoonRewardUnlocked++;
} else {
//Over Max
}

};


//
//Player Acceptance of Rewards
function blueMoonRewardAccept(reward, type){
//console.log("reward func hit");

if(type === "discount"){
playerHoldStoreDiscountHalf++;
eventRewardHtmlUpdate("+1 50% Off Coupon", true);
blueMoonWonDiscounts++;
} else if (type === "clickmult") {
eventBonusRateIncrease = reward;
eventRewardHtmlUpdate("Multi Up +" + reward + "x", true);
} else if (type === "crithit") {
eventCriticalHitRateIncrease = reward;
eventRewardHtmlUpdate("Crit Hit Up +" + reward + "%", true);
} else if (type === "critrate") {
eventCriticalHitRateIncrease = reward;
eventRewardHtmlUpdate("Crit Rate Up +" + reward + "x", true);
}
};


//Event 6
//Hades Prowl
function eventHadesProwl() {
//Big bad guy comes to syphon your coins, but if you defeat him he drops a free store coupon
//
//He starts to syphon off a ranom small % of your hoard every 1 sec
//You have to make at least 1 dollar more than the amount you started with
//If you don't fail
//If you do, free store coupon


//Testing
console.log('Hades Prowl Event');


//Init Function

//
//Set Bonus Round as current event
currentEvent = hadesProwlEvent.eventName;
eventActive = true;

//Event Info
eventStartTime = 0;
eventEndTime = hadesProwlEvent.defaultEventLength * 1000;
eventTimeRemaining = hadesProwlEvent.defaultEventLength;


//Reset Values
eventBonusChance1 = 0;
eventBonusChance2 = 0;
eventCriticalHitRateIncrease = 0;//Event Buffs only come from Coins Badges
eventCriticalRateIncrease = 0;//Event Buffs only come from Coins Badges
eventBonusRateIncrease = 1;//Event Buffs only come from Coins Badges
eventBonusInfoText = "";

//Hades
hadesCurrentEarned = 0;
hadesCurrentEarnedPretty = "";
hadesCurrentEarnedText = "";
hadesGPS = 0;
hadesGPSAdjustment = 0;
hadesCritHit = 0;
hadesCritRate = 0;
hadesGoldTotal = 0;
hadesGoldTotalPretty = "";
playerTotalSnapshot = 0;
playerTotalSnapshotPretty = "";
playerTotalEventEnd = 0;
playerTotalEventEndPretty = "";
hadesDefeated = false;
notificationCritHades = false;
hadesGPSQuarters = 0;
hadesGoldBonus = 0;
hadesGoldBonusPretty = "";
hadesGoldBonusText = "";

//Assign Current Hades Values
hadesGPS += player.currentCPS;

if (ghand1Badge.owned) {
hadesGPS += ghand1.overallCPS;
}
if (ghand2Badge.owned) {
hadesGPS += ghand2.overallCPS;
}
if (ghand3Badge.owned) {
hadesGPS += ghand3.overallCPS;
}

//Badge Discount
if(allBadges[10].owned){
hadesGPS -= (hadesGPS * (allBadges[10].currentBonus1/100))
}


hadesGPSQuarters = hadesGPS / 0.25;

hadesCritHit += player.criticalHitChance;
hadesCritRate += player.criticalHitRate;
playerTotalSnapshot = goldTotal+1;//requirement to have more gold then start
playerTotalSnapshotPretty = prettyNums(playerTotalSnapshot, true, true).join('').trim();

hades.setAttribute('visible', true);
//directionalLight.emit('eventHadesProwl',{});
//moonLight.emit('eventHadesProwl',{});
sceneEl.emit('eventHadesProwl',{});

//Set Event Description
eventline3.innerHTML = "Goal : Minimum";
eventline4.innerHTML = playerTotalSnapshotPretty;

//Event Bonus Info
eventBonusInfoText = "Hit Goal for a Free Store Reward!";

//Player Badge Upgrade
if(allBadges[10].owned){
//Event Bonus Info
eventBonusInfoText = "Hit Goal for a Free Store Reward!" + "% | Bonus " + allBadges[10].currentBonus2 + "x";
}

eventbonustext.innerHTML = eventBonusInfoText ;

//Event End Timer
eventTimeout = setTimeout(function () {

//Snapshot Final Total
playerTotalEventEnd = goldTotal;
playerTotalEventEndPretty = prettyNums(playerTotalEventEnd, true, true).join('').trim();

if(playerTotalSnapshot < playerTotalEventEnd){
hadesDefeated = true;
} else {
hadesDefeated = false;
}


//Event End
eventEnd(hadesProwlEvent);
}, eventEndTime); //Delay

//Event Interval - Update HTML
eventInterval = setInterval(function() {

	//Hades Syphon Function
	hadesAutoClicker();

	//Calc Remaining Time and Display, do not let go below 0
	eventTimeRemaining--; 
	if(eventTimeRemaining < 0){
		eventTimeRemaining = 0
	}
	eventline2.innerHTML = "Time Remaining : " + eventTimeRemaining + " seconds";

	hadesGoldTotalPretty = prettyNums(hadesGoldTotal, true, true).join('').trim();

	eventgoldcountertext.innerHTML = hadesGoldTotalPretty + " : Stolen Gold";

}, 1000); //Interval

};

//
//Hades Auto Clicks Function
function hadesAutoClicker() {

//Needs to be in 0.25 increments

//Testing
//console.log("Hades GPS : " + hadesGPS);

//console.log("Hades GPS Quarters : " + hadesGPSQuarters);

//In low level situations where the user earns a few quarters
//Could make where the event wont pop until the user can mine themselves at least 1, so Hades can earn from 0.75 to 1.25
//Within +75% - +100% - +125%


//Needs to be up to -25% or up to +25%
//Hades Gold Per Second Adjustments
hadesGPSAdjustment = 0;

eventBonusChance1 = Math.floor(Math.random()*5);

//-25, 0, +25
if(eventBonusChance1 === 0){
hadesGPSAdjustment = 0.50
} else if(eventBonusChance1 === 1){
hadesGPSAdjustment = 0.75
} else if(eventBonusChance1 === 2){
hadesGPSAdjustment = 1.25
} else if(eventBonusChance1 === 3){
hadesGPSAdjustment = 1.75
} else if(eventBonusChance1 === 4){
hadesGPSAdjustment = 2
}

//Testing
//console.log(eventBonusChance1);
//console.log(hadesGPSAdjustment);

//The % of Quarters Hades GPS will lose / gain
hadesGPSTweak = Math.floor(hadesGPSQuarters * hadesGPSAdjustment);

//Testing
//console.log(hadesGPSTweak);


//Add the Adjustment
hadesGPS = hadesGPSTweak * 0.25;

//Testing
//console.log(hadesGPS);

//Check for Critical Hit
//Add amount from what player is, if Crit mult by Bonus %
if(checkChanceRollHades(hadesCritHit)) {

	//Increase Gold Amount by Rate x Crit Bonus
	hadesCurrentEarned = Math.floor(hadesGPS * hadesCritRate);

	//Mark HTML Notification for Crit Decoration
	notificationCritHades = true;

	//Mark Aframe Notification for Crit Decoration
	//ghand1goldpersecond.setAttribute('mixin','acgpscrit');
} else {
	hadesCurrentEarned = hadesGPS; ;
	//Mark Notification for Normal Decoration
	notificationCritHades = false;

	//Mark Aframe Notification for Crit Decoration
	//ghand1goldpersecond.setAttribute('mixin','acgps');
}

//Updates
hadesGoldTotal += hadesCurrentEarned;
hadesProwlEvent.lifetimeEventEarnings += hadesCurrentEarned;
goldTotal -= hadesCurrentEarned;

hadesCurrentEarnedPretty = prettyNums(hadesCurrentEarned, true, true).join('').trim();

hadesCurrentEarnedText = hadesCurrentEarnedPretty + " Gold";

//HTML Notification
eventRewardHtmlUpdate(hadesCurrentEarnedText, false);

//Update Hades GPS Text
hadesgpstext.setAttribute('text',{value: hadesCurrentEarnedText});

//A-Frame Text Notification
hadesgpstext.emit('hadesclick',{});

};


//
//Event 7
//Cosmic Aurora
function eventCosmicAurora() {
//Bonus multiplier, increased hit crit chance and rate.
//

//ToDo
//Scene Animation : Add Meteor Storm

//Testing
console.log('Cosmic Aurora Event');

//Init Function

//
//Set Bonus Round as current event
currentEvent = cosmicAuroraEvent.eventName;
eventActive = true;

//Event Info
eventStartTime = 0;
eventEndTime = cosmicAuroraEvent.defaultEventLength * 1000;
eventTimeRemaining = cosmicAuroraEvent.defaultEventLength;


//Reset Values
eventBonusChance1 = 0;
eventBonusChance2 = 0;
eventBonusChance3 = 0;
eventCriticalHitRateIncrease = 0;//Event Buffs only come from Coins Badges
eventCriticalRateIncrease = 0;//Event Buffs only come from Coin Badges
eventBonusRateIncrease = 1;//Event Buffs only come from Coin Badges
eventBonusInfoText = "";

//User is randomly given a buff for click multi, crit hit and crit rate
eventBonusChance1 = Math.floor(Math.random()*5);
eventBonusChance2 = Math.floor(Math.random()*5);
eventBonusChance3 = Math.floor(Math.random()*5);

eventCriticalHitRateIncrease = criticalChanceRate[eventBonusChance1];
eventCriticalRateIncrease = bonusMultipliers[eventBonusChance2];
eventBonusRateIncrease = bonusMultipliers2[eventBonusChance3];


if(allBadges[11].owned){
eventBonusRateIncrease *= allBadges[11].currentBonus2;
}

//Event Bonus Info
eventBonusInfoText = "Multi Up " + eventBonusRateIncrease +  "x | Crit Hit Up +" + eventCriticalHitRateIncrease + "%  , Crit Rate Up +" + eventCriticalRateIncrease + "x";
//
//Set Bonus Info to the Scene
eventbonustext.innerHTML = eventBonusInfoText;

//Set Event Description
eventline3.innerHTML = "A Celestial Aura Flourishes!";

//Anim
sceneEl.emit('eventCosmicAurora',{});

//Event End Timer
eventTimeout = setTimeout(function () {
//Event End
eventEnd(cosmicAuroraEvent);
}, eventEndTime); //Delay

//Event Interval - Update HTML
eventInterval = setInterval(function() {

	//Pretify the Number
	currentEventEarningsPretty = prettyNums(currentEventEarnings, true, true).join('').trim();

	//Calc Remaining Time and Display, do not let go below 0
	eventTimeRemaining--; 
	if(eventTimeRemaining < 0){
		eventTimeRemaining = 0
	}
	eventline2.innerHTML = "Time Remaining : " + eventTimeRemaining + " seconds";
	eventgoldcountertext.innerHTML = currentEventEarningsPretty + " : Event Gold";//$1,000,000,000 Gold

}, 1000); //Interval




};


//
//Event Notification
function eventMsg(event) {

//Set Notification Text
eventline1.innerHTML = event.eventName + " Event";
eventline2.innerHTML = "Time Remaining : " + event.defaultEventLength;
eventline3.innerHTML = "Event Description";

//Set Event duration
root.style.setProperty('--eventAnimDur', event.defaultEventLength.toString() + 's');

//Make the CSS Animation Repeat
eventNotification.classList.remove("event-anim");
eventNotification.classList.remove("event-anim-opac-out");
eventNotification.classList.remove("event-end-anim");
void eventNotification.offsetWidth;
eventNotification.classList.add("event-anim");
};


//
//Reset Event Variables
function eventEnd(event) {

//Testing to see if this will help keep all unconfigured event text from showing
eventline1.innerHTML = "";
eventline2.innerHTML = "";
eventline3.innerHTML = "";
eventline4.innerHTML = "";

//Html Notification
eventEndMsg(event);

//After Event end, reset these back to 0 and currentEvent
clearInterval(eventInterval);
eventActive = false;
eventCriticalRateIncrease = 0;
eventCriticalHitRateIncrease = 0;
eventBonusRateIncrease = 1;
eventBonusInfoText = "";
eventBonusChance1 = 0;
eventBonusChance2 = 0;
eventBonusChance3 = 0;
currentEvent = "";
currentEventTempClicks = 0;
eventTick = 0;
eventTimeRemaining = 0;
eventStartTime = -1;//gets reset to 0 later which starts a flow
eventEndTime = 0;
eventTimeout = setTimeout(function () {});
eventTimeout2 = setTimeout(function () {});
//eventInterval = setInterval(function() {});
eventEndReady = false;

console.log('Event End')
};


//Event Notification
function eventEndMsg(event) {


endmsgText = "Your Outcome is...";

//highNoonEvent
//goldCoinStormEvent
//genieChallengeEvent
//bonusRoundEvent
//blueMoonEvent
//hadesProwlEvent
//cosmicAuroraEvent

currentEventEarningsPretty = prettyNums(currentEventEarnings, true, true).join('').trim();
lifetimeEventEarningsPretty = prettyNums(event.lifetimeEventEarnings, true, true).join('').trim();



//Set Event End Message and other importnat


//Which event
if(event === highNoonEvent){
endmsgText = "A Bright Afternoon Yielded";
eventline3.innerHTML = "Earned : " + currentEventEarningsPretty;
eventline4.innerHTML = "Lifetime Total : " + lifetimeEventEarningsPretty;


} else if(event === goldCoinStormEvent){
endmsgText = "Gold a Plenty!";
eventline3.innerHTML = "Earned : " + currentEventEarningsPretty;
eventline4.innerHTML = "Lifetime Total : " + lifetimeEventEarningsPretty;


} else if(event === genieChallengeEvent){

//Disable invisible A-Frame text
genieBetText.setAttribute('visible','false');

//Set Notification Text
eventline2.innerHTML = "A Duels Outcome";
//Challenge a Success?
if(challengeMet){
//Reward
eventline3.innerHTML = "Congrats! " + challengeProgress + " out of " + challengeGoal;
eventline4.innerHTML = "Won : +" + betWonAmountPretty;
//HTML Notification Reward Amount
eventRewardHtmlUpdate(betWonAmountPretty, true);
//Add the num to gold total
goldTotal += betWonAmount;
} else {
eventline3.innerHTML = "Better Luck Next Time " + challengeProgress + " / " + challengeGoal;
eventline4.innerHTML = "Lost : -" + betAmountPretty;
}
} else if(event === bonusRoundEvent){
endmsgText = "Bonus! Bonus!";
eventline3.innerHTML = "Earned : " + currentEventEarningsPretty;
eventline4.innerHTML = "Lifetime Total : " + lifetimeEventEarningsPretty;

} else if(event === blueMoonEvent){

endmsgText = "A Midnight's Spoils";
//Set Notification Text
eventline3.innerHTML = "Earned : " + currentEventEarningsPretty +" &  +" + blueMoonWonDiscounts + "Tickets!";
eventline4.innerHTML = "Lifetime Total : " + lifetimeEventEarningsPretty;

} else if(event === hadesProwlEvent){
hades.setAttribute('visible', false);

if (hadesDefeated){
//gift free coupon
//HTML Notification
eventRewardHtmlUpdate("+1 Free Coupon", true);
playerHoldStoreDiscountFull++;

hadesLifetimeEarningPretty = prettyNums(hadesProwlEvent.lifetimeEventEarnings, true, true).join('').trim();

endmsgText = "Vanquished!";
eventline3.innerHTML = "Earned : 1 Free Store Upgrade";
eventline4.innerHTML = "Hades Total : " + hadesLifetimeEarningPretty;
} else {

//For losing, Hades gets a bonus
hadesGoldBonus = Math.floor(hadesGoldTotal/2);
goldTotal -= hadesGoldBonus;
hadesProwlEvent.lifetimeEventEarnings += hadesGoldBonus;

hadesGoldTotal += hadesGoldBonus;

hadesGoldTotalPretty = prettyNums(hadesGoldTotal, true, true).join('').trim();
hadesLifetimeEarningPretty = prettyNums(hadesProwlEvent.lifetimeEventEarnings, true, true).join('').trim();
hadesGoldBonusPretty = prettyNums(hadesGoldBonus, true, true).join('').trim();

//HTML Notification
eventRewardHtmlUpdate(hadesGoldBonusPretty, false);

endmsgText = "He Creeps...";
eventline3.innerHTML = "Hades Stole : " + hadesGoldTotalPretty;
eventline4.innerHTML = "Hades Total : " + hadesLifetimeEarningPretty;
}

} else if(event === cosmicAuroraEvent){
endmsgText = "A Night of Colors!";
eventline3.innerHTML = "Earned : " + currentEventEarningsPretty;
eventline4.innerHTML = "Lifetime Total : " + lifetimeEventEarningsPretty;

} else {
eventline3.innerHTML = "Earned : " + currentEventEarningsPretty;
eventline4.innerHTML = "Lifetime Total : " + lifetimeEventEarningsPretty;
}

//Set Notification Text
eventline1.innerHTML = event.eventName + " Event End";
eventline2.innerHTML = endmsgText;



//Make the CSS Animation Repeat
eventNotification.classList.remove("event-anim");
eventNotification.classList.remove("event-anim-opac-out");
eventNotification.classList.remove("event-end-anim");
void eventNotification.offsetWidth;
eventNotification.classList.add("event-end-anim");

//Timeout and Interval
resetEventNotification = setTimeout(function () {

	//Reset final vars
	currentEventEarningsPretty = "";
	lifetimeEventEarningsPretty = "";
	currentEventEarnings = 0;
	eventline4.innerHTML = "";

}, 10500); //Delay

};


//
//Event Gold Counter
function eventGoldCounterAnim(event) {

//Notification Text set and reset in Event's function

//Set Event duration
root.style.setProperty('--eventAnimDur', event.defaultEventLength.toString() + 's');

//Make the CSS Animation Repeat
eventgoldcounter.classList.remove("event-anim-opac");
eventgoldcounter.classList.remove("event-anim-opac-out");
eventbonusnotification.classList.remove("event-anim-opac");
eventbonusnotification.classList.remove("event-anim-opac-out");
void eventgoldcounter.offsetWidth;
void eventbonusnotification.offsetWidth;
eventgoldcounter.classList.add("event-anim-opac");
eventbonusnotification.classList.add("event-anim-opac");
};


//
//Event Checker
function checkChanceRollUser(chance) {
//RNG Roll from 0 to 100
checkRoll = Math.floor(Math.random() * 100);
//Testing
//console.log(checkRoll);
	if (checkRoll <= chance) {
	//Success
	rollCheck = true;
	//Testing
	//console.log("Roll Success");
	//Return true to start event
	return rollCheck;
	} else {
	//Failed
	rollCheck = false;
	//Testing
	//console.log("Roll Failed");
	//Return false to prevent event start
	return rollCheck;
	}

};


//
//Auto Clicker 1 Crit Checker
function checkChanceRollghand1(chance) {
//RNG Roll from 1 to 100
checkRollghand1 = Math.floor(Math.random() * 100);
	if (checkRollghand1 <= chance) {
	//Success
	rollCheckghand1 = true;
	//Return true to start event
	return rollCheckghand1;
	} else {
	//Failed
	rollCheckghand1 = false;
	//Return false to prevent event start
	return rollCheckghand1;
	}

};


//
//Auto Clicker 2 Crit Checker
function checkChanceRollghand2(chance) {
//RNG Roll from 1 to 100
checkRollghand2 = Math.floor(Math.random() * 100);
	if (checkRollghand2 <= chance) {
	//Success
	rollCheckghand2 = true;
	//Return true to start event
	return rollCheckghand2;
	} else {
	//Failed
	rollCheckghand2 = false;
	//Return false to prevent event start
	return rollCheckghand2;
	}

};


//
//Auto Clicker 1 Crit Checker
function checkChanceRollghand3(chance) {
//RNG Roll from 1 to 100
checkRollghand3 = Math.floor(Math.random() * 100);
	if (checkRollghand3 <= chance) {
	//Success
	rollCheckghand3 = true;
	//Return true to start event
	return rollCheckghand3;
	} else {
	//Failed
	rollCheckghand3 = false;
	//Return false to prevent event start
	return rollCheckghand3;
	}

};


//
//Event Checker
function eventCheckRoll(chance) {
//RNG Roll from 0 to 100
eventRoll = Math.floor(Math.random() * 100);
//Testing
console.log(eventRoll);
	if (eventRoll <= chance) {
	//Success
	eventRollCheck = true;
	//Testing
	console.log("Event Roll Success");
	//Return true to start event
	return eventRollCheck;
	} else {
	//Failed
	eventRollCheck = false;
	//Testing
	console.log("Event Roll Failed");
	//Return false to prevent event start
	return eventRollCheck;
	}

};


//
//Hades Crit Checker
function checkChanceRollHades(chance) {
//RNG Roll from 0 to 100
eventRollCheckHades = Math.floor(Math.random() * 100);
//Testing
//console.log(eventRollCheckHades);
	if (eventRollCheckHades <= chance) {
	//Success
	eventRollCheckHades = true;
	//Testing
	//console.log("Roll Success");
	//Return true to start event
	return eventRollCheckHades;
	} else {
	//Failed
	eventRollCheckHades = false;
	//Testing
	//console.log("Roll Failed");
	//Return false to prevent event start
	return eventRollCheckHades;
	}

};


var eventCheckName = ['highnoon', 'goldcoinstorm', 'rivalgenie', 'bonusround', 'bluemoon', 'hadesprowl', 'cosmicaurora'];
var slot2Hit;
var slot3Hit;


//
//Event Checker
function eventChecker(event) {
//Will be ran in the every second tack function
//or make a new 1 min check
//Testing
console.log('Event Checker Running');

//Connectors:
//slotHinge
//slotChamber1
//slotChamber2
//slotChamber3
//
//Events:
//eventCheck
//slot1 - slot7

//Event Check Anim
slotHinge.emit('eventCheck',{});
slotChamber1.emit('eventCheck',{});
slotChamber2.emit('eventCheck',{});
slotChamber3.emit('eventCheck',{});
slotChamber1.emit(event,{});

//Repeated Check for event pop up
if (event === "highnoon") {// Event 1
	//Check RNG roll against Event Chance + Coin Bonus

	//Default Event Value
	event1Chance = highNoonEvent.defaultChanceRate;
	//Event Failure Bonus
	event1Chance += event1ChanceBonus;
	//Player Coin Bonus
	if(highNoonBadge.owned){
		event1Chance += highNoonBadge.currentBonus1;
	}

	if (eventCheckRoll(event1Chance)) {
		//Success

		//Event Slot Anim
		slotChamber2.emit(event,{});
		slotChamber3.emit(event,{});

		//Anim Timeout
		var slotAnimTimeout = setTimeout(function () {
				//Notify in HTML
				eventMsg(highNoonEvent);
				eventGoldCounterAnim(highNoonEvent);

				//Reset event fail bonus modifier as Event Succeeded
				event1ChanceBonus = 0;

				//Start Event
				eventHighNoon();
		}, 9000); //Delay

	} else {
		//Failed

		//Event Slot Anim
		//50% Chance for 2nd Chamber to hit Event on fail
		if(Math.floor(Math.random()*2) === 0){
			slotChamber2.emit(event,{});
		} else {
			slot2Hit = eventCheckName[Math.floor(Math.random()*eventCheckName.length)];
				while(event === slot2Hit){
				slot2Hit = eventCheckName[Math.floor(Math.random()*eventCheckName.length)];}
			slotChamber2.emit(slot2Hit,{});
		}
		//As it failed, it will hit any except for the event in question
		slot3Hit = eventCheckName[Math.floor(Math.random()*eventCheckName.length)];
		while(event === slot3Hit){
		slot3Hit = eventCheckName[Math.floor(Math.random()*eventCheckName.length)];}
		slotChamber3.emit(slot3Hit,{});

		//Add a small amount to the chance for next time
		event1ChanceBonus += 10;

		//Testing
		console.log('High Noon Failed');
	}
} else if (event === "goldcoinstorm") {// Event 2
	//Check RNG roll against Event Chance + Coin Bonus

	//Default Event Value
	event2Chance = goldCoinStormEvent.defaultChanceRate;
	//Event Failure Bonus
	event2Chance += event2ChanceBonus;
	//Player Coin Bonus
	if(goldCoinStormBadge.owned){
		event2Chance += goldCoinStormBadge.currentBonus1;
	}
	if (eventCheckRoll(event2Chance)) {
		//Success

		//Event Slot Anim
		slotChamber2.emit(event,{});
		slotChamber3.emit(event,{});

		//Anim Timeout
		var slotAnimTimeout = setTimeout(function () {

			//Notify in HTML
			eventMsg(goldCoinStormEvent);
			eventGoldCounterAnim(goldCoinStormEvent);

			//Reset event fail bonus modifier as Event Succeeded
			event2ChanceBonus = 0;
			//Start Event
			eventGoldCoinStorm();

		}, 9000); //Delay
	} else {
		//Failed

		//Event Slot Anim
		//50% Chance for 2nd Chamber to hit Event on fail
		if(Math.floor(Math.random()*2) === 0){
			slotChamber2.emit(event,{});
		} else {
			slot2Hit = eventCheckName[Math.floor(Math.random()*eventCheckName.length)];
				while(event === slot2Hit){
				slot2Hit = eventCheckName[Math.floor(Math.random()*eventCheckName.length)];}
			slotChamber2.emit(slot2Hit,{});
		}
		slot3Hit = eventCheckName[Math.floor(Math.random()*eventCheckName.length)];
		//As it failed, it will hit any except for the event in question
		while(event === slot3Hit){
		slot3Hit = eventCheckName[Math.floor(Math.random()*eventCheckName.length)];}
		slotChamber3.emit(slot3Hit,{});

		//Add a small amount to the chance for next time
		event2ChanceBonus += 10;

		//Testing
		console.log('Gold Coin Storm Failed');
	}
} else if (event === "rivalgenie") {// Event 3
	//Check RNG roll against Event Chance

	//Default Event Value
	event3Chance = genieChallengeEvent.defaultChanceRate;
	//Event Failure Bonus
	event3Chance += event3ChanceBonus;
	//No Player Coin Bonus

	if (eventCheckRoll(event3Chance)) {
		//Success

		//Event Slot Anim
		slotChamber2.emit(event,{});
		slotChamber3.emit(event,{});

		//Anim Timeout
		var slotAnimTimeout = setTimeout(function () {

			//Notify in HTML
			eventMsg(genieChallengeEvent);
			eventGoldCounterAnim(genieChallengeEvent);

			//Reset event fail bonus modifier as Event Succeeded
			event3ChanceBonus = 0;
			//Start Event
			eventGenieChallenge();

		}, 9000); //Delay
	} else {
		//Failed

		//Event Slot Anim
		//50% Chance for 2nd Chamber to hit Event on fail
		if(Math.floor(Math.random()*2) === 0){
			slotChamber2.emit(event,{});
		} else {
			slot2Hit = eventCheckName[Math.floor(Math.random()*eventCheckName.length)];
				while(event === slot2Hit){
				slot2Hit = eventCheckName[Math.floor(Math.random()*eventCheckName.length)];}
			slotChamber2.emit(slot2Hit,{});
		}
		slot3Hit = eventCheckName[Math.floor(Math.random()*eventCheckName.length)];
		//As it failed, it will hit any except for the event in question
		while(event === slot3Hit){
		slot3Hit = eventCheckName[Math.floor(Math.random()*eventCheckName.length)];}
		slotChamber3.emit(slot3Hit,{});

		//Add a small amount to the chance for next time
		event3ChanceBonus += 10;

		//Testing
		console.log('Rival Challenge Failed');
	}
} else if (event === "bonusround") {// Event 4
	//Check RNG roll against Event Chance + Coin Bonus

	//Default Event Value
	event4Chance = bonusRoundEvent.defaultChanceRate;
	//Event Failure Bonus
	event4Chance += event4ChanceBonus;
	//Player Coin Bonus
	if(bonusRoundBadge.owned){
		event4Chance += bonusRoundBadge.currentBonus1;
	}

	if (eventCheckRoll(event4Chance)) {
		//Success

		//Event Slot Anim
		slotChamber2.emit(event,{});
		slotChamber3.emit(event,{});

		//Anim Timeout
		var slotAnimTimeout = setTimeout(function () {
			//Notify in HTML
			eventMsg(bonusRoundEvent);
			eventGoldCounterAnim(bonusRoundEvent);

			//Reset event fail bonus modifier as Event Succeeded
			event4ChanceBonus = 0;
			//Start Event
			eventBonusRound();
		}, 9000); //Delay
	} else {
		//Failed

		//Event Slot Anim
		//50% Chance for 2nd Chamber to hit Event on fail
		if(Math.floor(Math.random()*2) === 0){
			slotChamber2.emit(event,{});
		} else {
			slot2Hit = eventCheckName[Math.floor(Math.random()*eventCheckName.length)];
				while(event === slot2Hit){
				slot2Hit = eventCheckName[Math.floor(Math.random()*eventCheckName.length)];}
			slotChamber2.emit(slot2Hit,{});
		}
		slot3Hit = eventCheckName[Math.floor(Math.random()*eventCheckName.length)];
		//As it failed, it will hit any except for the event in question
		while(event === slot3Hit){
		slot3Hit = eventCheckName[Math.floor(Math.random()*eventCheckName.length)];}
		slotChamber3.emit(slot3Hit,{});

		//Add a small amount to the chance for next time
		event4ChanceBonus += 10;

		//Testing
		console.log('Bonus Round Failed');
	}
} else if (event === "bluemoon") {// Event 5
	//Check RNG roll against Event Chance + Coin Bonus

	//Default Event Value
	event5Chance = blueMoonEvent.defaultChanceRate;
	//Event Failure Bonus
	event5Chance += event5ChanceBonus;
	//Player Coin Bonus
	if(blueMoonBadge.owned){
		event5Chance += blueMoonBadge.currentBonus1;
	}

	if (eventCheckRoll(event5Chance)) {
		//Success

		//Event Slot Anim
		slotChamber2.emit(event,{});
		slotChamber3.emit(event,{});

		//Anim Timeout
		var slotAnimTimeout = setTimeout(function () {

			//Notify in HTML
			eventMsg(blueMoonEvent);
			eventGoldCounterAnim(blueMoonEvent);

			//Reset event fail bonus modifier as Event Succeeded
			event5ChanceBonus = 0;
			//Start Event
			eventBlueMoon();

		}, 9000); //Delay
	} else {
		//Failed

		//Event Slot Anim
		//50% Chance for 2nd Chamber to hit Event on fail
		if(Math.floor(Math.random()*2) === 0){
			slotChamber2.emit(event,{});
		} else {
			slot2Hit = eventCheckName[Math.floor(Math.random()*eventCheckName.length)];
				while(event === slot2Hit){
				slot2Hit = eventCheckName[Math.floor(Math.random()*eventCheckName.length)];}
			slotChamber2.emit(slot2Hit,{});
		}
		slot3Hit = eventCheckName[Math.floor(Math.random()*eventCheckName.length)];
		//As it failed, it will hit any except for the event in question
		while(event === slot3Hit){
		slot3Hit = eventCheckName[Math.floor(Math.random()*eventCheckName.length)];}
		slotChamber3.emit(slot3Hit,{});

		//Add a small amount to the chance for next time
		event5ChanceBonus += 10;

		//Testing
		console.log('Blue Moon Failed');
	}
} else if (event === "hadesprowl") {// Event 6
	//Check RNG roll against Event Chance

	//Default Event Value
	event6Chance = hadesProwlEvent.defaultChanceRate;
	//Event Failure Bonus
	event6Chance += event6ChanceBonus;
	//No Player Coin Bonus

	if (eventCheckRoll(event6Chance)) {
		//Success

		//Event Slot Anim
		slotChamber2.emit(event,{});
		slotChamber3.emit(event,{});

		//Anim Timeout
		var slotAnimTimeout = setTimeout(function () {

			//Notify in HTML
			eventMsg(hadesProwlEvent);
			eventGoldCounterAnim(hadesProwlEvent);

			//Reset event fail bonus modifier as Event Succeeded
			event6ChanceBonus = 0;
			//Start Event
			eventHadesProwl();

		}, 9000); //Delay
	} else {
		//Failed

		//Event Slot Anim
		//50% Chance for 2nd Chamber to hit Event on fail
		if(Math.floor(Math.random()*2) === 0){
			slotChamber2.emit(event,{});
		} else {
			slot2Hit = eventCheckName[Math.floor(Math.random()*eventCheckName.length)];
				while(event === slot2Hit){
				slot2Hit = eventCheckName[Math.floor(Math.random()*eventCheckName.length)];}
			slotChamber2.emit(slot2Hit,{});
		}
		slot3Hit = eventCheckName[Math.floor(Math.random()*eventCheckName.length)];
		//As it failed, it will hit any except for the event in question
		while(event === slot3Hit){
		slot3Hit = eventCheckName[Math.floor(Math.random()*eventCheckName.length)];}
		slotChamber3.emit(slot3Hit,{});

		//Add a small amount to the chance for next time
		event6ChanceBonus += 6;

		//Testing
		console.log('Hades Prowl Failed');
	}
} else if (event === "cosmicaurora") {// Event 7
	//Check RNG roll against Event Chance + Coin Bonus

	//Default Event Value
	event7Chance = cosmicAuroraEvent.defaultChanceRate;
	//Event Failure Bonus
	event7Chance += event7ChanceBonus;
	//Player Coin Bonus
	if(cosmicAuroraBadge.owned){
		event7Chance += cosmicAuroraBadge.currentBonus1;
	}

	if (eventCheckRoll(event7Chance)) {
		//Success

		//Event Slot Anim
		slotChamber2.emit(event,{});
		slotChamber3.emit(event,{});

		//Anim Timeout
		var slotAnimTimeout = setTimeout(function () {
			//Notify in HTML
			eventMsg(cosmicAuroraEvent);
			eventGoldCounterAnim(cosmicAuroraEvent);

			//Reset event fail bonus modifier as Event Succeeded
			event7ChanceBonus = 0;
			//Start Event
			eventCosmicAurora();
		}, 9000); //Delay
	} else {
		//Failed

		//Event Slot Anim
		//50% Chance for 2nd Chamber to hit Event on fail
		if(Math.floor(Math.random()*2) === 0){
			slotChamber2.emit(event,{});
		} else {
			slot2Hit = eventCheckName[Math.floor(Math.random()*eventCheckName.length)];
				while(event === slot2Hit){
				slot2Hit = eventCheckName[Math.floor(Math.random()*eventCheckName.length)];}
			slotChamber2.emit(slot2Hit,{});
		}
		slot3Hit = eventCheckName[Math.floor(Math.random()*eventCheckName.length)];
		//As it failed, it will hit any except for the event in question
		while(event === slot3Hit){
		slot3Hit = eventCheckName[Math.floor(Math.random()*eventCheckName.length)];}
		slotChamber3.emit(slot3Hit,{});

		//Add a small amount to the chance for next time
		event7ChanceBonus += 7;

		//Testing
		console.log('Cosmic Aurora Failed');
	}
}

};


//
//New Day
function newDay() {

dayElapsed++;
minElapsed = 0;
eventTimePick();


};


//
//Event Time Pick
function eventTimePick() {

//Reset Temp Variables
eventGoldCoinStormTime = 0;
eventGoldCoinStormTimeName = "";
eventGenieChallengeTime = 0;
eventGenieChallengeTimeName = "";
eventHadesProwlTime = 0;
eventHadesProwlTimeName = "";

eventBonusChance1 = 0;

eventNumsPos = [0, 1, 2, 3];
eventNums = [];


//Randomly assign 3 of 4 values to 3 different entities
for(let i = eventNumsPos.length; i > 0 ; i--){
eventBonusChance1 = Math.floor(Math.random()*i);
eventNums.push(eventNumsPos[eventBonusChance1]);
eventNumsPos.splice(eventBonusChance1,1);
}

//Testing
//console.log("Event Order Switcher " + eventOrderSwitcher);

//Randomly Pick Order of Event Time Filling
if(eventOrderSwitcher === 1) {
eventGenieChallengeTime = randomTimeList[eventNums[1]];
eventGenieChallengeTimeName = randomTimeListNames[eventNums[1]];
eventHadesProwlTime = randomTimeList[eventNums[2]];
eventHadesProwlTimeName = randomTimeListNames[eventNums[2]];
eventGoldCoinStormTime = randomTimeList[eventNums[0]];
eventGoldCoinStormTimeName = randomTimeListNames[eventNums[0]];

} else if(eventOrderSwitcher === 2) {
eventHadesProwlTime = randomTimeList[eventNums[1]];
eventHadesProwlTimeName = randomTimeListNames[eventNums[1]];
eventGoldCoinStormTime = randomTimeList[eventNums[2]];
eventGoldCoinStormTimeName = randomTimeListNames[eventNums[2]];
eventGenieChallengeTime = randomTimeList[eventNums[0]];
eventGenieChallengeTimeName = randomTimeListNames[eventNums[0]];

} else {
//Default 0 and Others
eventGenieChallengeTime = randomTimeList[eventNums[2]];
eventGenieChallengeTimeName = randomTimeListNames[eventNums[2]];
eventGoldCoinStormTime = randomTimeList[eventNums[1]];
eventGoldCoinStormTimeName = randomTimeListNames[eventNums[1]];
eventHadesProwlTime = randomTimeList[eventNums[0]];
eventHadesProwlTimeName = randomTimeListNames[eventNums[0]];

}

//Assign Randomly Generated Times
goldCoinStormEvent.eventDailyTime = eventGoldCoinStormTime;
goldCoinStormEvent.eventDailyTimeName = eventGoldCoinStormTimeName;
genieChallengeEvent.eventDailyTime = eventGenieChallengeTime;
genieChallengeEvent.eventDailyTimeName = eventGenieChallengeTimeName;
hadesProwlEvent.eventDailyTime = eventHadesProwlTime;
hadesProwlEvent.eventDailyTimeName = eventHadesProwlTimeName;

};


//
//HTML Total Gold Counter
function htmlGoldCounterUpdate() {
    //Gold Totals
	goldText = prettyNums(goldTotal, true, true).join('').trim();
	//console.log(goldText);
    //Gold Totals
    currentGoldText = goldText + goldTotalPostString;
	//console.log(currentGoldText);
	//HTML Gold Counter
	goldcountertext.innerHTML = currentGoldText;

	//A-Frame 2D Environment Text
    aframeText.setAttribute('text', {value: currentGoldText});

};


//
//Gold Click Update
function goldClickHtmlUpdate(text) {


//htmlNotificationArray
//htmlNotificationTextArray
//notification#
//notification#Text
//htmlNotificationToggle

    //Gold Totals
	//Update Div with clicker's gold amount
	htmlNotificationTextArray[htmlNotificationToggle].innerHTML = text;

	//Reset Style if crit
	htmlNotificationArray[htmlNotificationToggle].classList.remove("notificationsCrit");

	//Make the CSS Animated Html Div Repeat Once
	htmlNotificationArray[htmlNotificationToggle].classList.remove("notification-anim");
	void htmlNotificationArray[htmlNotificationToggle].offsetWidth;
	htmlNotificationArray[htmlNotificationToggle].classList.add("notification-anim");

	if (notificationCrit) {
	htmlNotificationArray[htmlNotificationToggle].classList.add("notificationsCrit");
	}


	//Update toggle for next list order
	htmlNotificationToggle++;
	//Check var to Reset
	if (htmlNotificationToggle === htmlNotificationArray.length){
		htmlNotificationToggle = 0;
	}

	//A-Frame Animation to Scale Button on all Clicks
	clickerButton.emit('goldclick',{})

};


//
//Auto Click Update
function autoClickHtmlUpdate(text) {

	//Update Div with clicker's gold amount
	notification0Text.innerHTML = text;

	//Reset Style if crit
	notification0.classList.remove("notificationsCrit");

	//Make the CSS Animated Html Div Repeat Once
	notification0.classList.remove("notification-anim");
	void notification0.offsetWidth;
	notification0.classList.add("notification-anim");

	if (notificationCritGhand1 || notificationCritghand2 || notificationCritghand3) {
		notification0.classList.add("notificationsCrit");
	}

	//A-Frame Animation to Scale Button on all Clicks
	clickerButton.emit('goldclick',{})

};


//
//Event Reward HTML Update
function eventRewardHtmlUpdate(text, positive) {


	//take in another param to for the color to be normal aka + good
	// or bad negative red


	//Update Div with clicker's gold amount
	if(positive){
	notificationEvent.classList.remove("notificationsBad");
	notificationEvent.classList.add("notificationsCrit");
	notificationEventText.innerHTML = "+" + text;
	} else {
	notificationEvent.classList.remove("notificationsCrit");
	notificationEvent.classList.add("notificationsBad");
	notificationEventText.innerHTML = "-" + text;
	}

	//Make the CSS Animated Html Div Repeat Once
	notificationEvent.classList.remove("notification-anim");
	void notificationEvent.offsetWidth;
	notificationEvent.classList.add("notification-anim");

};


//
//Player Click
function playerClick() {

//Check for Critical Hit
//Add amount from what player is, if Crit mult by Bonus %
if(checkChanceRollUser(player.criticalHitChance + eventCriticalHitRateIncrease)) {

	//Increase Gold Amount by Rate x Crit Bonus
	currentGoldEarned = (player.currentCPS * (player.criticalHitRate + eventCriticalRateIncrease));

	//Stat Collection
	player.criticalHits++;

	//Mark HTML Notification for Crit Decoration
	notificationCrit = true;
	//Mark Aframe Notification for Crit Decoration
	usergpsnotifications[gpsnotificationstoggle].setAttribute('mixin','usergpscrit');
} else {
	currentGoldEarned = player.currentCPS;
	//Mark Notification for Normal Decoration
	notificationCrit = false;
	//Mark Aframe Notification for Crit Decoration
	usergpsnotifications[gpsnotificationstoggle].setAttribute('mixin','usergps');
}


//Event Adjustments
if(eventActive){
if(currentEvent === highNoonEvent.eventName){
	highNoonEvent.currentEventClicks++;
	//Check if player owns coin and add bonus if so
	if(allBadges[5].owned){
	   currentGoldEarned *= allBadges[5].currentBonus2;
	}
	highNoonEvent.lifetimeEventEarnings += currentGoldEarned;
	currentEventEarnings += currentGoldEarned;
} else if(currentEvent === goldCoinStormEvent.eventName){
	goldCoinStormEvent.currentEventClicks++;
	//Check if player owns coin and add bonus if so
	if(allBadges[6].owned){
	   currentGoldEarned *= allBadges[6].currentBonus2;
	}
	currentGoldEarned *= eventBonusRateIncrease;
	goldCoinStormEvent.lifetimeEventEarnings += currentGoldEarned;
	currentEventEarnings += currentGoldEarned;
} else if(currentEvent === genieChallengeEvent.eventName){
	genieChallengeEvent.currentEventClicks++;
	challengeProgress++;
	//Check if player owns coin and add bonus if so
	if(allBadges[7].owned){
	   currentGoldEarned *= allBadges[7].currentBonus2;
	}
} else if(currentEvent === bonusRoundEvent.eventName){
	//Pure Bonus Gold, no clicks
} else if(currentEvent === blueMoonEvent.eventName){
	blueMoonEvent.currentEventClicks++;
	blueMoonTempClicks++;
	//Check if player owns coin and add bonus if so
	if(allBadges[9].owned){
	   currentGoldEarned *= allBadges[9].currentBonus2;
	}
	currentGoldEarned *= eventBonusRateIncrease;
	currentEventEarnings += currentGoldEarned;
	blueMoonEvent.lifetimeEventEarnings += currentGoldEarned;
} else if(currentEvent === hadesProwlEvent.eventName){
	hadesProwlEvent.currentEventClicks++;
	//Check if player owns coin and add bonus if so
	if(allBadges[10].owned){
	   currentGoldEarned *= allBadges[10].currentBonus2;
	}
} else if(currentEvent === cosmicAuroraEvent.eventName){
	cosmicAuroraEvent.currentEventClicks++;
	//Check if player owns coin and add bonus if so
	if(allBadges[11].owned){
	   currentGoldEarned *= allBadges[11].currentBonus2;
	}
	currentGoldEarned *= eventBonusRateIncrease;
	currentEventEarnings += currentGoldEarned;
	cosmicAuroraEvent.lifetimeEventEarnings += currentGoldEarned;
}
}

//Tally Gold
goldTotal += currentGoldEarned;

//50 Cent Number Pretify
fiftyCentArray = Array.from(currentGoldEarned.toString());
//Ready Notification Text
if (fiftyCentArray[fiftyCentArray.length-2] === "." && fiftyCentArray[fiftyCentArray.length-1] === "5") {
currentGoldEarnedText = "+" + currentGoldEarned + "0" + " Gold";
} else {
	currentGoldEarnedText = "+" + currentGoldEarned + " Gold";
}

//Update Aframe Notification Entities
usergpsnotifications[gpsnotificationstoggle].setAttribute('text',{value:currentGoldEarnedText});
usergpsnotifications[gpsnotificationstoggle].emit('goldclick',{})

//Pool Toggle for Notifications
gpsnotificationstoggle++;
//Check var to Reset
if (gpsnotificationstoggle === usergpsnotifications.length){
	gpsnotificationstoggle = 0;
}

//Send info to HTML Functions
goldClickHtmlUpdate(currentGoldEarnedText);

//Stat Collection
player.lifetimeClicks++;
player.lifetimeClicksEarned += currentGoldEarned;





};


//Function to ensure Hand clicks are synced
function syncAutoClickers(){

if (ghand1Badge.animSet) {
genieHand1.setAttribute('animation-mixer', {timeScale:1.225});
genieHand1.setAttribute('visible',true);
ghand1Badge.animSet = false;
}
if (ghand2Badge.animSet) {

genieHand2.setAttribute('animation-mixer', {timeScale:1.225});
genieHand2.setAttribute('visible',true);
ghand2Badge.animSet = false;
}
if (ghand3Badge.animSet) {
genieHand3.setAttribute('animation-mixer', {timeScale:1.225});
genieHand3.setAttribute('visible',true);
ghand3Badge.animSet = false;
}


}


//
//Auto Clicker Function Gates
function autoClicker() {
//If User has purchased Auto Clicker 1, run ghand1 Function, etc...

syncAutoClickers();

if (ghand1Badge.owned) {
	//Running Auto Clicker
	geniehand1();
}
if (ghand2Badge.owned) {
	//Running Auto Clicker
	geniehand2();
}
if (ghand3Badge.owned) {
	//Running Auto Clicker
	geniehand3();
}

//Event Adjustments
if(eventActive){
if(currentEvent === highNoonEvent.eventName){
	highNoonEvent.currentEventClicks += currentEventTempClicks;
	ghandsGoldEarnedTotal *= eventBonusRateIncrease;
	//Check if player owns coin and add bonus if so
	if(allBadges[5].owned){
	   ghandsGoldEarnedTotal *= allBadges[5].currentBonus2;
	}
	highNoonEvent.lifetimeEventEarnings += ghandsGoldEarnedTotal;
	currentEventEarnings += ghandsGoldEarnedTotal;
} else if(currentEvent === goldCoinStormEvent.eventName){
	goldCoinStormEvent.currentEventClicks += currentEventTempClicks;
	ghandsGoldEarnedTotal *= eventBonusRateIncrease;
	//Check if player owns coin and add bonus if so
	if(allBadges[6].owned){
	   ghandsGoldEarnedTotal *= allBadges[6].currentBonus2;
	}
	goldCoinStormEvent.lifetimeEventEarnings += ghandsGoldEarnedTotal;
	currentEventEarnings += ghandsGoldEarnedTotal;
} else if(currentEvent === genieChallengeEvent.eventName){
	genieChallengeEvent.currentEventClicks += currentEventTempClicks;
	//Check if player owns coin and add bonus if so
	if(allBadges[7].owned){
	   ghandsGoldEarnedTotal *= allBadges[7].currentBonus2;
	}
} else if(currentEvent === bonusRoundEvent.eventName){
	//Pure Bonus Gold, no clicks
} else if(currentEvent === blueMoonEvent.eventName){
	blueMoonEvent.currentEventClicks += currentEventTempClicks;
	blueMoonTempClicks++;
	ghandsGoldEarnedTotal *= eventBonusRateIncrease;
	//Check if player owns coin and add bonus if so
	if(allBadges[9].owned){
	   ghandsGoldEarnedTotal *= allBadges[9].currentBonus2;
	}
	currentEventEarnings += ghandsGoldEarnedTotal;
	blueMoonEvent.lifetimeEventEarnings += ghandsGoldEarnedTotal;
} else if(currentEvent === hadesProwlEvent.eventName){
	hadesProwlEvent.currentEventClicks += currentEventTempClicks;
	//Check if player owns coin and add bonus if so
	if(allBadges[10].owned){
	   ghandsGoldEarnedTotal *= allBadges[10].currentBonus2;
	}
	currentEventEarnings += ghandsGoldEarnedTotal;
	hadesProwlEvent.lifetimeEventEarnings += ghandsGoldEarnedTotal;

} else if(currentEvent === cosmicAuroraEvent.eventName){
	cosmicAuroraEvent.currentEventClicks += currentEventTempClicks;
	ghandsGoldEarnedTotal *= eventBonusRateIncrease;
	//Check if player owns coin and add bonus if so
	if(allBadges[11].owned){
	   ghandsGoldEarnedTotal *= allBadges[11].currentBonus2;
	}
	currentEventEarnings += ghandsGoldEarnedTotal;
	cosmicAuroraEvent.lifetimeEventEarnings += ghandsGoldEarnedTotal;
}
}

//Add gold total for all acs here
goldTotal += ghandsGoldEarnedTotal;

//Pretify Auto Clicker's Numbers
ghandsNotificationText = prettyNums(ghandsGoldEarnedTotal, true, true).join('').trim();
//Hit HTML with overall total
currentGhandsGoldEarnedText = "+" + ghandsNotificationText + " Gold";
//Gold Click Function
autoClickHtmlUpdate(currentGhandsGoldEarnedText);


//Reset AC Gold Earned Timeout to avoid collisions
var resetInterval = setTimeout(function () {
ghandsGoldEarnedTotal = 0;
}, 900); //Delay


};


//
//Auto Clicks Function
function geniehand1() {

//Update Lifetime Clicks
ghand1Badge.lifetimeClicks++;
currentEventTempClicks++;

//Genie Event Challenge Clicks
if(eventActive){
if(currentEvent === genieChallengeEvent.eventName){
challengeProgress++;
}
}

//Run Auto Click Animations

//Check for Critical Hit
//Add amount from what player is, if Crit mult by Bonus %
if(checkChanceRollghand1(ghand1Badge.criticalHitChance + eventCriticalHitRateIncrease)) {

	//Increase Gold Amount by Rate x Crit Bonus
	ghand1CurrentGoldEarned = (ghand1Badge.currentCPS * (ghand1Badge.criticalHitRate + eventCriticalRateIncrease));

	//Stat Collection
	ghand1Badge.criticalHits++;

	//Mark HTML Notification for Crit Decoration
	notificationCritGhand1 = true;

	//Mark Aframe Notification for Crit Decoration
	ghand1goldpersecond.setAttribute('mixin','acgpscrit');
} else {
	ghand1CurrentGoldEarned = ghand1Badge.currentCPS ;
	//Mark Notification for Normal Decoration
	notificationCritGhand1 = false;
	//Mark Aframe Notification for Crit Decoration
	ghand1goldpersecond.setAttribute('mixin','acgps');
}

//Updates
//If Event Bonus, otherwise will be *1
ghand1CurrentGoldEarned *= eventBonusRateIncrease;
//goldTotal += ghand1CurrentGoldEarned;
ghandsGoldEarnedTotal += ghand1CurrentGoldEarned; 
ghand1GoldEarnedText = "+" + ghand1CurrentGoldEarned + " Gold";
ghand1goldpersecond.setAttribute('text',{value:ghand1GoldEarnedText});
ghand1goldpersecond.emit('autoclick',{});


};


//
//Auto Clicks Function
function geniehand2() {

//Update Lifetime Clicks
ghand2Badge.lifetimeClicks ++;
currentEventTempClicks++;
//Run Auto Click Animations

//Genie Event Challenge Clicks
if(eventActive){
if(currentEvent === genieChallengeEvent.eventName){
challengeProgress++;
}
}

//Check for Critical Hit
//Add amount from what player is, if Crit mult by Bonus %
if(checkChanceRollghand2(ghand2Badge.criticalHitChance + eventCriticalHitRateIncrease)) {

	//Increase Gold Amount by Rate x Crit Bonus
	ghand2CurrentGoldEarned = (ghand2Badge.currentCPS * (ghand2Badge.criticalHitRate + eventCriticalRateIncrease));

	//Stat Collection
	ghand2Badge.criticalHits++;

	//Mark HTML Notification for Crit Decoration
	notificationCritghand2 = true;

	//Mark Aframe Notification for Crit Decoration
	ghand2goldpersecond.setAttribute('mixin','acgpscrit');
} else {
	ghand2CurrentGoldEarned = ghand2Badge.currentCPS ;
	//Mark Notification for Normal Decoration
	notificationCritghand2 = false;
	//Mark Aframe Notification for Crit Decoration
	ghand2goldpersecond.setAttribute('mixin','acgps');
}

//Updates
//If Event Bonus, otherwise will be *1
ghand2CurrentGoldEarned *= eventBonusRateIncrease;
//goldTotal += ghand2CurrentGoldEarned;
ghandsGoldEarnedTotal += ghand2CurrentGoldEarned; 
ghand2GoldEarnedText = "+" + ghand2CurrentGoldEarned + " Gold";
ghand2goldpersecond.setAttribute('text',{value:ghand2GoldEarnedText});
ghand2goldpersecond.emit('autoclick',{});

//Test Logging
//console.log('clicker 2 running');
//console.log(ghand2.lifetimeClicks);
};


//
//Auto Clicks Function
function geniehand3() {

//Update Lifetime Clicks
ghand3Badge.lifetimeClicks++;
currentEventTempClicks++;
//Run Auto Click Animations

//Genie Event Challenge Clicks
if(eventActive){
if(currentEvent === genieChallengeEvent.eventName){
challengeProgress++;
}
}

//Check for Critical Hit
//Add amount from what player is, if Crit mult by Bonus %
if(checkChanceRollghand3(ghand3Badge.criticalHitChance + eventCriticalHitRateIncrease)) {

	//Testing
	//console.log(ghand3.overallCPS * ghand3.criticalHitRate);

	//Increase Gold Amount by Rate x Crit Bonus
	ghand3CurrentGoldEarned = (ghand3Badge.currentCPS * (ghand3Badge.criticalHitRate + eventCriticalRateIncrease));

	//Stat Collection
	ghand3Badge.criticalHits++;

	//Mark HTML Notification for Crit Decoration
	notificationCritghand3 = true;

	//Mark Aframe Notification for Crit Decoration
	ghand3goldpersecond.setAttribute('mixin','acgpscrit');
} else {
	ghand3CurrentGoldEarned = ghand3Badge.currentCPS;
	//Mark Notification for Normal Decoration
	notificationCritghand3 = false;
	//Mark Aframe Notification for Crit Decoration
	ghand3goldpersecond.setAttribute('mixin','acgps');
}

//Updates
//If Event Bonus, otherwise will be *1
ghand3CurrentGoldEarned *= eventBonusRateIncrease;
//goldTotal += ghand3CurrentGoldEarned;
ghandsGoldEarnedTotal += ghand3CurrentGoldEarned; 
ghand3GoldEarnedText = "+" + ghand3CurrentGoldEarned + " Gold";
ghand3goldpersecond.setAttribute('text',{value:ghand3GoldEarnedText});
ghand3goldpersecond.emit('autoclick',{});

//Test Logging
//console.log('clicker 3 running');
//console.log(ghand3.lifetimeClicks);
};


//
//Pretty Numbers
function prettyNums(num,money,runDecimal) {

//Convert num to string and store as an Array
newNum = Array.from(num.toString());
addCommas;
commaLength;

//Check for Decimal?
if (runDecimal) {
//Check if it ends with a .25, .5 or .75 then remove the 3 from the string before adding commas and re-add it back to the end at the end.
foundDecimal = newNum.indexOf(".", 1);

if ( foundDecimal === -1) {
//Not found
decimal = false;
} else {
//Found Decimal
decimal = true;
decimalTemp = newNum.slice(foundDecimal,newNum.length);
//Fix it
//Testing
//console.log(decimalTemp);
//console.log(newNum);
	//it's either +1 or +2 depending if it ends in 
	//+1 on 5
	//+2 on 2 or 7
	if (newNum[foundDecimal+1] === "5") {
	//Pop twice
	newNum.pop();
	newNum.pop();

	//Add a Zero for the .5 case
	decimalTemp.push("0");

	} else if (newNum[foundDecimal+2] === "5") {
	//Pop thrice
	newNum.pop();
	newNum.pop();
	newNum.pop();

	} else {
	//Where did you go wrong to get here?
	}

}
//console.log(newNum);
}//End Decimal Check
//Check if the number has 1, 2 or 3 numbers before the first comma. All after the third afterwards
// 000,
if (newNum.length % 3 === 0) {
//Comma after every 3rd num
//How many times to add a comma
addCommas = newNum.length / 3;
//Avoid the last Triple Set Comma
commaLength = addCommas - 1;
//
for (let i = commaLength; i > 0; i--){
newNum.splice(i*3, 0, ',');
}
// 1,
} else if (newNum.length % 3 === 1) {
//Comma after first num, then every 3rd num

//Offset for First Comma
addCommas = newNum.length - 1;
//How many comma's total
commaLength = addCommas / 3;
//
for (let i = commaLength; i > 0; i--){
//newNum.splice(i*3, 0, ',');
newNum.splice((i*3)-2, 0, ',');
}

// 21,
} else if (newNum.length % 3 === 2) {
//Comma after first two nums, then every 3rd num

//Offset for First Comma
addCommas = newNum.length - 2;
//How many comma's total
commaLength = addCommas / 3;
//
for (let i = commaLength; i > 0; i--){
//newNum.splice(i*3, 0, ',');
newNum.splice((i*3)-1, 0, ',');
}
} else {
//Not enough numbers to add commas
}

//If Check for Decimal
if (runDecimal) {
//Add Decimal back if exists
if(decimal){
	newNum.push(decimalTemp.join('').trim());
}}

//Add a $ at the beg of array
if(money){
newNum.unshift("$");   
}



return newNum;
//End Pretty Numbers
};


//
//Error
function errorMsg(string) {

errorText.innerHTML = string;
//Make the CSS Animation Repeat
error.classList.remove("error-anim");
void error.offsetWidth;
error.classList.add("error-anim");
};


//Update Indv Badges
function storeUpdateBadgeItem(badge,num) {

//ID String Creations
badgeCostID = "badge" + num + "Cost" ;
badgeTitle1ID = "badge" + num + "Title1" ;
badgeTitle2ID = "badge" + num + "Title2" ;
badgeLevelID = "badge" + num + "Level" ;
badgeLockID = "badge" + num + "Lock" ;
badgeUnlockID = "badge" + num + "Unlock" ;
badgeUnlockMsgID = "badge" + num + "UnlockMsg" ;

if(badge.maxLeveled){
//Override the Cost at Max level
badgeCostPretty = "Max Level";
} else {

//Half Discount On
if(storeDiscountHalf) {
useDiscount = 2;
} else {
useDiscount = 1;
}
//Assign Discounts
storeNextLevelCost = badge.nextLvlCost / useDiscount;

//Full Discount On Override
if (storeDiscountFull){
//Assign Discounts
storeNextLevelCost = 0;
}

//Pretify the Cost
badgeCostPretty = prettyNums(storeNextLevelCost, true, true).join('').trim();

}

if(badge.unlocked){
//Badge Cost - #badge1Cost
document.getElementById(badgeCostID).innerHTML = badgeCostPretty;
//Badge Image - #badge1Image
//Need a Base Image
//Badge Name - #badge1Title1
document.getElementById(badgeTitle1ID).innerHTML = badge.name;
//Badge Description - #badge1Title2
document.getElementById(badgeTitle2ID).innerHTML = badge.description;
//Badge Level - #badge1Level
document.getElementById(badgeLevelID).innerHTML = "Level : " + badge.currentLevel;

//Hide Normal Unlock Msg and Display Normal Badge Screen
//badge1Lock needs to be hidden
document.getElementById(badgeLockID).style.setProperty('display', 'block');
//badge1Unlock needs to be displayed
document.getElementById(badgeUnlockID).style.setProperty('display', 'none');

} else {

//badgeUnlockMsg needs to be updated
document.getElementById(badgeUnlockMsgID).innerHTML = "Unlock : " + badge.lockedMessage;

//Hide Normal Badge Screen and Display Unlock Message
//badge1Lock needs to be displayed
document.getElementById(badgeLockID).style.setProperty('display', 'none');
//badge1Unlock needs to be hidden
document.getElementById(badgeUnlockID).style.setProperty('display', 'block');

}

};


//
//Update Store Screen
function updateStoreScreen() {

//Main Store Badge Outlines Screen
//
//loop through function to display all badges currently available
for(let i = 0; i < allBadges.length; i++){

//Update each badge summary wether unlocked or locked
storeUpdateBadgeItem(allBadges[i],i+1);

}


};


//
//Update Badge Screen
function updateSubScreen(badge){

if(badge.name === "Home"){
//Error Return
return;
}

//Half Discount On
if(storeDiscountHalf) {
useDiscount = 2;
} else {
useDiscount = 1;
}
//Assign Discounts
storeNextLevelCost = badge.nextLvlCost / useDiscount;

//Full Discount On Override
if (storeDiscountFull){
//Assign Discounts
storeNextLevelCost = 0;
}

//Pretify the Cost
badgeCostPretty = prettyNums(storeNextLevelCost, true, true).join('').trim();

//Base Updates
//
//Badge Image - #badgeImage
//badgeImage.innerHTML = badge.;
//Badge Title 1 - #badgeTitle1
badgeTitle1.innerHTML = badge.name;
//Badge Title 2- #badgeTitle2
//badgeTitle2.innerHTML = badge.description;
//Badge Level - #badgeLevel
badgeLevel.innerHTML = "Level " + badge.currentLevel;
//Badge Description - #badgeDescription
badgeDescription.innerHTML = badge.description;



//Update Based on Specific Level Next Bonus Upgrade Info and Costs
//

//Next Level Info and Upgrades
//
//If badge level is maxed out
if (badge.maxLeveled) {
//disable button and add Max level Reached

//Next Level Up Bonus 1 - #nextBonusCost
nextBonusCost.innerHTML = "Max Level Reached";
//Next Level Up Bonus 2 - #nextBonusBenefit1
nextBonusBenefit1.innerHTML = "";
nextBonusBenefit2.innerHTML = "";
//Next Level Up Cost - #storeBuyAC
storeBuyAC.innerHTML = "Max Level";

} else  {

//Add Info specific to buying / Unlocking this item for the first time
if (badge.currentLevel === 0){
//Next Level Up Bonus 1 - #nextBonusCost
nextBonusCost.innerHTML = "Unlock Cost : " + badgeCostPretty;

//Next Level Up Cost - #storeBuyAC
storeBuyAC.innerHTML = "Unlock " + badge.name + " for " + badgeCostPretty;

badgeCurrentPreText = "Unlocks to ";
badgePurchasePreText = "Unlocks to ";
} else {
//Next Level Up Bonus 1 - #nextBonusCost
nextBonusCost.innerHTML = "Upgrade Cost : " + badgeCostPretty;

//Next Level Up Cost - #storeBuyAC
storeBuyAC.innerHTML = "Upgrade " + badge.name + " for " + badgeCostPretty;

badgeCurrentPreText = "Currently ";
badgePurchasePreText = "Upgrades to ";
}



if(badge == allBadges[0]){//Player Tap
nextCPSPretty = prettyNums(badge.badgeLevels1[badge.currentLevel], true, true).join('').trim();
nextBonusBenefit1.innerHTML = badgePurchasePreText + nextCPSPretty + " Gold/sec";
nextBonusBenefit2.innerHTML = "";

} else if(badge == allBadges[1]) {//Lucky Goldfish
nextBonusBenefit1.innerHTML = badgePurchasePreText + "+" + badge.badgeLevels1[badge.currentLevel] + "% Critical Hit Chance";
nextBonusBenefit2.innerHTML = badgePurchasePreText + badge.badgeLevels2[badge.currentLevel] + "x Critical Hit Rate";

} else if(badge == allBadges[2] || badge == allBadges[3] || badge == allBadges[4]){//Genie Hands
nextCPSPretty = prettyNums(badge.badgeLevels1[(badge.currentLevel)], true, true).join('').trim();
nextBonusBenefit1.innerHTML = badgePurchasePreText + nextCPSPretty + " Gold/sec";
nextBonusBenefit2.innerHTML = "";

} else { //Events
nextBonusBenefit2.innerHTML = badgePurchasePreText + badge.badgeLevels2[badge.currentLevel] + "x Bonus During Event";
//Type of Event
if(badge === allBadges[5] || badge === allBadges[6] || badge === allBadges[8] || badge === allBadges[11]){
nextBonusBenefit1.innerHTML = badgePurchasePreText + "+" + badge.badgeLevels1[badge.currentLevel] + "% Chance to Pop Event";
} else if(badge === allBadges[7]) {
nextBonusBenefit1.innerHTML = badgePurchasePreText + "-" + badge.badgeLevels1[badge.currentLevel] + "% Click Amount Reduced Bet Goal";
} else if(badge === allBadges[9]) {
nextBonusBenefit1.innerHTML = badgePurchasePreText + "-" + badge.badgeLevels1[badge.currentLevel] + "% Click Amount Reduced Reward Goal";
} else if(badge === allBadges[10]) {
nextBonusBenefit1.innerHTML = badgePurchasePreText + "-" + badge.badgeLevels1[badge.currentLevel] + "% Amount Reduced for Enemy Earnings";
}

}//Else Events
}//Else Not Max Level



//Update Current Info
//
//Update Based on Specific Badge
//
//Check if PlayerTap, Genie Hands or Other LGF/Events
if(badge === allBadges[0]){
//If Badge is Player Tap

//Pretty Current CPS
currentCPSPretty = prettyNums(badge.currentCPS, true, true).join('').trim();

//Overall Earn Rate - #overallCps
overallCps.innerHTML = badgeCurrentPreText + currentCPSPretty + " Gold/sec";

//If haven't leveled up yet, hide overallcps
if(badge.currentLevel === 0){
//Overall Earn Rate - #overallCps
overallCps.innerHTML = "";
}

//Bonus 1 - #badgeBonus1
badgeBonus1.innerHTML = "Increase Player Tap Earnings to " + currentCPSPretty + " Gold";
//Bonus 2 - #badgeBonus2
badgeBonus2.innerHTML = "";

//Lifetime Click Stat - #lifetimeClickshtml
lifetimeClickshtml.innerHTML = player.lifetimeClicks + " Lifetime Player Clicks";


} else if(badge === allBadges[1]){
//If Badge is Lucky Goldfish

//Overall Earn Rate - #overallCps
overallCps.innerHTML = badgeCurrentPreText + " Critical Hit Chance : +" + badge.currentBonus1 + "% | Rate : " + badge.currentBonus2 + "x";
//If haven't leveled up yet, hide overallcps
if(badge.currentLevel === 0){
//Overall Earn Rate - #overallCps
overallCps.innerHTML = "";
}

//Bonus 1 - #badgeBonus1
badgeBonus1.innerHTML = "Player Critical Hit Chance : " + player.criticalHitChance + "% | Rate : " + player.criticalHitRate + "x";

//Bonus 2 - #badgeBonus2
badgeBonus2.innerHTML = "Badge Critical Hit Chance : +" + badge.currentBonus1 + "% | Rate : " + badge.currentBonus2 + "x";

//Lifetime Click Stat - #lifetimeClickshtml
lifetimeClickshtml.innerHTML = player.lifetimeClicks + " Lifetime Player Clicks";


} else if(badge === allBadges[2] || badge === allBadges[3] || badge === allBadges[4]){
//Else if Badge is Genie Hands

//Pretty Current CPS
currentCPSPretty = prettyNums(badge.currentCPS, true, true).join('').trim();
//Overall Earn Rate - #overallCps
overallCps.innerHTML = badgeCurrentPreText + currentCPSPretty + " Gold/sec";
//If haven't leveled up yet, hide overallcps
if(badge.currentLevel === 0){
//Overall Earn Rate - #overallCps
overallCps.innerHTML = "";
}

//Bonus 1 - #badgeBonus1
badgeBonus1.innerHTML = "Critical Hit Chance : " + badge.criticalHitChance + "%";
//Bonus 2 - #badgeBonus2
badgeBonus2.innerHTML = "Critical Hit Rate : " + badge.criticalHitRate + "x";

//Lifetime Click Stat - #lifetimeClickshtml
lifetimeClickshtml.innerHTML = badge.lifetimeClicks + " Lifetime Genie Clicks";

} else {
//Otherwsie, Lucky GF and Events
//Type of Event
if(badge === allBadges[5] || badge === allBadges[6] || badge === allBadges[8] || badge === allBadges[11]){
badgeBonus1.innerHTML = "+" + badge.currentBonus1 + "% Chance to Pop Event";
} else if(badge === allBadges[7]) {
badgeBonus1.innerHTML = "-" + badge.currentBonus1 + "% Click Amount Reduced Bet Goal";
} else if(badge === allBadges[9]) {
badgeBonus1.innerHTML = "-" + badge.currentBonus1 + "% Click Amount Reduced Reward Goal";
} else if(badge === allBadges[10]) {
badgeBonus1.innerHTML = "-" + badge.currentBonus1 + "% Amount Reduced for Enemy Earnings";
}

//Overall Earn Rate - #overallCps
overallCps.innerHTML = "";

//Bonus 2 - #badgeBonus2
badgeBonus2.innerHTML = badge.currentBonus2 + "x Bonus During Event";

//Lifetime Click Stat - #lifetimeClickshtml
lifetimeClickshtml.innerHTML = badge.lifetimeClicks + " Lifetime Event Clicks";

}

};//End Function


//
//Display Store Screen
function storeSection() {

    //Close all 1st
    closeAllMenu();

	//Update Store's Main Screen with All Badge Summary Info
	updateStoreScreen();

    //Menu Title Change
    screenTitle.innerHTML = "Store";

	//Display Discounts
    discountButtons.style.setProperty('display', 'inline-flex');

	//Discount Ticket Amounts
	storeDiscountHeldHalfText.innerHTML = "50% Off Discount Tickets : " + playerHoldStoreDiscountHalf + " | " + discountOnHalf;
	storeDiscountHeldFullText.innerHTML = "Free Discount Tickets : " + playerHoldStoreDiscountFull + " | " + discountOnFull;

    //Display Sub Screen
    root.style.setProperty('--subScreenDisplay', 'block');
    //Display Store Screen
    root.style.setProperty('--storeScreenDisplay', 'inline-flex');

};


//
//Display Achievement Screen
function achievementsSection() {

    //Close all 1st
    closeAllMenu();

    //Menu Title Change
    screenTitle.innerHTML = "Achievements";

    //Display Sub Screen
    root.style.setProperty('--subScreenDisplay', 'block');
    //Display Store Screen
    root.style.setProperty('--achievementsScreenDisplay', 'inline-flex');

};


//
//Display Settings Screen
function settingSection() {

    //Close all 1st
    closeAllMenu();

    //Menu Title Change
    screenTitle.innerHTML = "Settings";

    //Display Sub Screen
    root.style.setProperty('--subScreenDisplay', 'block');
    //Display Settings Screen
    root.style.setProperty('--settingsScreenDisplay', 'inline-flex');



};


//
//Close All
function closeAllMenu() {
    root.style.setProperty('--subScreenDisplay', 'none');
    root.style.setProperty('--screenTitleDisplay', 'none');
    root.style.setProperty('--settingsScreenDisplay', 'none');
    root.style.setProperty('--storeScreenDisplay', 'none');
    root.style.setProperty('--achievementsScreenDisplay', 'none');
    upgradeClickOff.style.setProperty('display', 'none');
    discountButtons.style.setProperty('display', 'none');

};


//
//Store Screen Switch
function closeStoreTabScreen(currentScreen) {

if(currentScreen === "badgeStore") {
//Badge Screen
badgeStore.style.setProperty('display', 'flex');
upgradeClickOff.style.setProperty('display', 'none');
upgrades.style.setProperty('display', 'none');
//Hide Discount Ticket Redemption
storeDiscountHeldHalf.style.setProperty('display', 'none');
storeDiscountHeldFull.style.setProperty('display', 'none');

} else if(currentScreen === "upgradeClickOff") {
//Badge Screen
badgeStore.style.setProperty('display', 'flex');
upgradeClickOff.style.setProperty('display', 'block');
upgrades.style.setProperty('display', 'none');
//Hide Discount Ticket Redemption
storeDiscountHeldHalf.style.setProperty('display', 'none');
storeDiscountHeldFull.style.setProperty('display', 'none');

} else {
//Badge Screen
badgeStore.style.setProperty('display', 'none');
upgradeClickOff.style.setProperty('display', 'none');
upgrades.style.setProperty('display', 'none');
}

};


//
//Purchase Badge and Badge Levels
function badgeBuyButton(badge) {

//Check if badge is still upgradable
if (badge.maxLeveled) {
//Max Level
errorMsg("Max Level Reached");
} else {
//Still Upgradable, continue

//Half Discount On
if(storeDiscountHalf) {
useDiscount = 2;
} else {
useDiscount = 1;
}
//Assign Discounts
storeNextLevelCost = badge.nextLvlCost / useDiscount;

//Full Discount On Override
if (storeDiscountFull){
//Assign Discounts
storeNextLevelCost = 0;
}


if (badge.currentLevel === 0) {

if(goldTotal >= storeNextLevelCost){
//Purchase Success
goldTotal -= storeNextLevelCost;
//1st Purchase
badge.owned = true;
badge.animSet = true;

//Pretify the Number
storeNextLevelCostPretty = prettyNums(storeNextLevelCost, true, true).join('').trim();

//Money removal html notification
eventRewardHtmlUpdate(storeNextLevelCostPretty, false);

//Update Badge
badge.currentLevel++;
//Level Offset for 0 Based Array
badge.ownNext = sequence[badge.currentLevel-1];

//Upgrade based on Badge type
if (badge === allBadges[0]) {
//player tap & genie hands have 1 bonud, all others have 2 to update
badge.currentCPS = badge.badgeLevels1[badge.currentLevel-1];
player.currentCPS = badge.badgeLevels1[badge.currentLevel-1];

} else if(badge === allBadges[1]) {
player.criticalHitChance = 4 + badge.badgeLevels1[badge.currentLevel-1];
player.criticalHitRate = badge.badgeLevels2[badge.currentLevel-1];
badge.currentBonus1 = badge.badgeLevels1[badge.currentLevel-1];
badge.currentBonus2 = badge.badgeLevels2[badge.currentLevel-2];

} else if (badge === allBadges[2] || badge === allBadges[3] || badge === allBadges[4]) {
//player tap & genie hands have 1 bonud, all others have 2 to update
badge.currentCPS = badge.badgeLevels1[badge.currentLevel-1];

} else {
//Raise currentBonus1 & 2 based on new current level
badge.currentBonus1 = badge.badgeLevels1[badge.currentLevel-1];
badge.currentBonus2 = badge.badgeLevels2[badge.currentLevel-1];
}

//Timeout and Interval
notifAnimDelay = setTimeout(function () {
//Badge unlocked/upgraded html notification
eventRewardHtmlUpdate((badge.name + " Unlocked"), true);
}, 1000); //Delay


//Deduct Discount Ticket if Used
if(storeDiscountHalf){
playerHoldStoreDiscountHalf--;
//Timeout and Interval
notifAnimDelay = setTimeout(function () {
//HTML update for losing 1 discount ticket
eventRewardHtmlUpdate("1 50% Off Coupon", false);
}, 2000); //Delay
storeDiscountHalf = false;
//Update Discount Ticket Amounts
storeDiscountHeldHalfText.innerHTML = "50% Off Discount Tickets : " + playerHoldStoreDiscountHalf + " | off";
discountHalfToggle = false;
} else if(storeDiscountFull){
playerHoldStoreDiscountFull--;
//Timeout and Interval
notifAnimDelay = setTimeout(function () {
//HTML update for losing 1 discount ticket
eventRewardHtmlUpdate("1 Free Coupon", false);
}, 2000); //Delay
storeDiscountFull = false;
//Update Discount Ticket Amounts
storeDiscountHeldFullText.innerHTML = "Free Discount Tickets : " + playerHoldStoreDiscountFull + " | off";
discountFullToggle = false;
}
//Update Next Level Cost
badge.nextLvlCost  = badge.buyLevels[badge.currentLevel]

} else {
//Not Enough Coin
errorMsg("Insufficient Funds");
}
} else if (badge.currentLevel === badge.badgeLevels1.length-1) {
//Last Upgrade

if(goldTotal >= storeNextLevelCost){
//Purchase Success
goldTotal -= storeNextLevelCost;

badge.maxLeveled = true;

//Pretify the Number
storeNextLevelCostPretty = prettyNums(storeNextLevelCost, true, true).join('').trim();

//Money removal html notification
eventRewardHtmlUpdate(storeNextLevelCostPretty, false);

//Update Badge
badge.currentLevel++;
//Level Offset for 0 Based Array
badge.ownNext = sequence[badge.currentLevel-1];

//Upgrade based on Badge type
if (badge === allBadges[0]) {
badge.currentCPS = badge.badgeLevels1[badge.currentLevel-1];
player.currentCPS = badge.badgeLevels1[badge.currentLevel-1];
} else if(badge === allBadges[1]) {
player.criticalHitChance = 4 + badge.badgeLevels1[badge.currentLevel-1];
player.criticalHitRate = badge.badgeLevels2[badge.currentLevel-1];
badge.currentBonus1 = badge.badgeLevels1[badge.currentLevel-1];
badge.currentBonus2 = badge.badgeLevels2[badge.currentLevel-1];
} else if (badge === allBadges[2] || badge === allBadges[3] || badge === allBadges[4]) {
badge.currentCPS = badge.badgeLevels1[badge.currentLevel-1];

} else {
//Raise currentBonus1 & 2 based on new current level
badge.currentBonus1 = badge.badgeLevels1[badge.currentLevel-1];
badge.currentBonus2 = badge.badgeLevels2[badge.currentLevel-1];
}

//Timeout and Interval
notifAnimDelay = setTimeout(function () {
//Badge unlocked/upgraded html notification
eventRewardHtmlUpdate((badge.name + " Max Level"), true);
}, 1000); //Delay


//Deduct Discount Ticket if Used
if(storeDiscountHalf){
playerHoldStoreDiscountHalf--;
//Timeout and Interval
notifAnimDelay = setTimeout(function () {
//HTML update for losing 1 discount ticket
eventRewardHtmlUpdate("1 50% Off Coupon", false);
}, 2000); //Delay
storeDiscountHalf = false;
//Update Discount Ticket Amounts
storeDiscountHeldHalfText.innerHTML = "50% Off Discount Tickets : " + playerHoldStoreDiscountHalf + " | off";
discountHalfToggle = false;
} else if(storeDiscountFull){
playerHoldStoreDiscountFull--;
//Timeout and Interval
notifAnimDelay = setTimeout(function () {
//HTML update for losing 1 discount ticket
eventRewardHtmlUpdate("1 Free Coupon", false);
}, 2000); //Delay
storeDiscountFull = false;
//Update Discount Ticket Amounts
storeDiscountHeldFullText.innerHTML = "Free Discount Tickets : " + playerHoldStoreDiscountFull + " | off";
discountFullToggle = false;
}

//No Need to Update Next Level Cost
} else {
//Not Enough Coin
errorMsg("Insufficient Funds");
}
} else {
//Normal Upgrade

if(goldTotal >= storeNextLevelCost){

//Purchase Success
goldTotal -= storeNextLevelCost;

//Pretify the Number
storeNextLevelCostPretty = prettyNums(storeNextLevelCost, true, true).join('').trim();

//Money removal html notification
eventRewardHtmlUpdate(storeNextLevelCostPretty, false);


//Update Badge
badge.currentLevel++;
//Level Offset for 0 Based Array
badge.ownNext = sequence[badge.currentLevel-1];


//Upgrade based on Badge type
if (badge === allBadges[0]) {
badge.currentCPS = badge.badgeLevels1[badge.currentLevel-1];
player.currentCPS = badge.badgeLevels1[badge.currentLevel-1];
} else if(badge === allBadges[1]) {
player.criticalHitChance = 4 + badge.badgeLevels1[badge.currentLevel-1];
player.criticalHitRate = badge.badgeLevels2[badge.currentLevel-1];
badge.currentBonus1 = badge.badgeLevels1[badge.currentLevel-1];
badge.currentBonus2 = badge.badgeLevels2[badge.currentLevel-1];
} else if (badge === allBadges[0] || badge === allBadges[2] || badge === allBadges[3] || badge === allBadges[4]) {
badge.currentCPS = badge.badgeLevels1[badge.currentLevel-1];
} else {
//Raise currentBonus1 & 2 based on new current level
badge.currentBonus1 = badge.badgeLevels1[badge.currentLevel-1];
badge.currentBonus2 = badge.badgeLevels2[badge.currentLevel-1];
}

//Timeout
notifAnimDelay = setTimeout(function () {
//Badge unlocked/upgraded html notification
eventRewardHtmlUpdate((badge.name + " Level " + badge.currentLevel), true);
}, 1000); //Delay



//Deduct Discount Ticket if Used
if(storeDiscountHalf){
playerHoldStoreDiscountHalf--;
//Timeout
notifAnimDelay = setTimeout(function () {
//HTML update for losing 1 discount ticket
eventRewardHtmlUpdate("1 50% Off Coupon", false);
}, 2000); //Delay
storeDiscountHalf = false;
//Update Discount Ticket Amounts
storeDiscountHeldHalfText.innerHTML = "50% Off Discount Tickets : " + playerHoldStoreDiscountHalf + " | off";
discountHalfToggle = false;
} else if(storeDiscountFull){
playerHoldStoreDiscountFull--;
//Timeout
notifAnimDelay = setTimeout(function () {
//HTML update for losing 1 discount ticket
eventRewardHtmlUpdate("1 Free Coupon", false);
}, 2000); //Delay
storeDiscountFull = false;
//Update Discount Ticket Amounts
storeDiscountHeldFullText.innerHTML = "Free Discount Tickets : " + playerHoldStoreDiscountFull + " | off";
discountFullToggle = false;
}



//Update Next Level Cost
badge.nextLvlCost  = badge.buyLevels[badge.currentLevel]
} else {
//Error, Not Enough Coin
errorMsg("Insufficient Funds");
}
}//End Level Check

}//End Max Level Check



//Refresh Sub Screen Afterwards
updateSubScreen(badge);
//Refresh Main Screen As Well
updateStoreScreen();
};


//
//Event Listeners
//

//A-Frame Window - Click Button Entity
//Mouse Enter
clickButton.addEventListener('mouseenter', function(){
    //Test Logging
    //console.log("mouseenter");
});
//
//Mouse Leave
clickButton.addEventListener('mouseleave', function(){
    //Test Logging
    //console.log("mouseleave");
});
//
//Mouse Down
clickButton.addEventListener('mousedown', function(){
    //Test Logging
    //console.log("mousedown");

	//Gold Click Function
	playerClick();
});
//
//Mouse Up
clickButton.addEventListener('mouseup', function(){
    //Test Logging
    //console.log("mouseup");
});
//
//Click
clickButton.addEventListener('click', function(){
    //Test Logging
    //console.log("click");

});


//
//Settings Button
settingsButton.addEventListener('click', function(){
    //Test Logging
    //console.log("click");

    //Hide The menuSections div and show the upgradesSection div
    settingSection();
    //When in a section, change menu button to be a back button
});


//
//Store Button
storeButton.addEventListener('click', function(){
    //Test Logging
    console.log("store");

    //Hide The menuSections div and show the upgradesSection div
    storeSection();
    //When in a section, change menu button to be a back button
});


//
//Achievements Button
achievementsButton.addEventListener('click', function(){
    //Test Logging
    //console.log("click");

    //Hide The menuSections div and show the upgradesSection div
    achievementsSection();
    //When in a section, change menu button to be a back button
});


//
//Sub Screen
subScreenActionButton.addEventListener('click', function(){

    //Close Menu
    closeAllMenu();
});


//
//Purchase Badges
storeBuyAC.addEventListener('click', function(){

    //check current store tab button is clicked
    badgeBuyButton(currentBadge);
});


//
//Discount Half Button
storeDiscountHeldHalfButton.addEventListener('click', function(){

if(discountHalfToggle){

if (playerHoldStoreDiscountHalf > 0){
discountOnHalf = "on";
discountHalfToggle = false;
//Toggle Other
discountOnFull = "off";
discountFullToggle = true;

//Set Actual Discount to be Used
storeDiscountHalf = true;
storeDiscountFull = false;

//Discount Ticket Amounts
storeDiscountHeldHalfText.innerHTML = "50% Off Discount Tickets : " + playerHoldStoreDiscountHalf + " | " + discountOnHalf;
storeDiscountHeldFullText.innerHTML = "Free Discount Tickets : " + playerHoldStoreDiscountFull + " | " + discountOnFull;

//Refresh Store Screen
updateStoreScreen();

} else {
errorMsg("No Tickets Available");
}

} else {

discountOnHalf = "off";
discountHalfToggle = true;

//Set Actual Discount to be Used
storeDiscountHalf = false;

//Discount Ticket Amounts
storeDiscountHeldHalfText.innerHTML = "50% Off Discount Tickets : " + playerHoldStoreDiscountHalf + " | " + discountOnHalf;

//Refresh Store Screen
updateStoreScreen();

}

});


//
//Discount Full Button
storeDiscountHeldFullButton.addEventListener('click', function(){
    //Test Logging
    //console.log("click");
if(discountFullToggle){

if (playerHoldStoreDiscountFull > 0){
discountOnFull = "on";
discountFullToggle = false;
//Toggle Other
discountOnHalf = "off";
discountHalfToggle = true;

//Set Actual Discount to be Used
storeDiscountHalf = false;
storeDiscountFull = true;

//Discount Ticket Amounts
storeDiscountHeldFullText.innerHTML = "Free Discount Tickets : " + playerHoldStoreDiscountFull + " | " + discountOnFull;
storeDiscountHeldHalfText.innerHTML = "50% Off Discount Tickets : " + playerHoldStoreDiscountHalf + " | " + discountOnHalf;

//Refresh Store Screen
updateStoreScreen();


} else {
errorMsg("No Tickets Available");
}
} else {

discountOnFull = "off";
discountFullToggle = true;

//Set Actual Discount to be Used
storeDiscountFull = false;

storeDiscountHeldFullText.innerHTML = "Free Discount Tickets : " + playerHoldStoreDiscountFull + " | " + discountOnFull;

//Refresh Store Screen
updateStoreScreen();

}

});


//Store Screen
//Click off Window to Close
upgradeClickOff.addEventListener('click', function(){

	//Hide Sub Screen and Click Off Screen
	upgradeSubScreen.style.setProperty('display', 'none');
	upgradeClickOff.style.setProperty('display', 'none');
	currentBadge = {name: "Home"};

	console.log('Badge Click Off');

});
//
//Badge 1
badge1.addEventListener('click', function(){

	//show Sub Screen
	upgradeSubScreen.style.setProperty('display', 'flex');

	//show Behind Click Off Screen
	upgradeClickOff.style.setProperty('display', 'block');

	//Update Sub Screen with Badge Specific Info
	updateSubScreen(allBadges[0]);
	currentBadge = allBadges[0];

	console.log('Badge 1 Click');

});
//
//Badge Clicks to open upgradeClickOff
badge2.addEventListener('click', function(){

	//show Sub Screen
	upgradeSubScreen.style.setProperty('display', 'flex');

	//show Behind Click Off Screen
	upgradeClickOff.style.setProperty('display', 'block');

	//Update Sub Screen with Badge Specific Info
	updateSubScreen(allBadges[1]);
	currentBadge = allBadges[1];

	console.log('Badge 2 Click');

});
//
//Badge Clicks to open upgradeClickOff
badge3.addEventListener('click', function(){

	//show Sub Screen
	upgradeSubScreen.style.setProperty('display', 'flex');

	//show Behind Click Off Screen
	upgradeClickOff.style.setProperty('display', 'block');

	//Update Sub Screen with Badge Specific Info
	updateSubScreen(allBadges[2]);
	currentBadge = allBadges[2];

	console.log('Badge 3 Click');

});
//
//Badge Clicks to open upgradeClickOff
badge4.addEventListener('click', function(){

	//show Sub Screen
	upgradeSubScreen.style.setProperty('display', 'flex');

	//show Behind Click Off Screen
	upgradeClickOff.style.setProperty('display', 'block');

	//Update Sub Screen with Badge Specific Info
	updateSubScreen(allBadges[3]);
	currentBadge = allBadges[3];

	console.log('Badge 4 Click');

});
//
//Badge Clicks to open upgradeClickOff
badge5.addEventListener('click', function(){

	//show Sub Screen
	upgradeSubScreen.style.setProperty('display', 'flex');

	//show Behind Click Off Screen
	upgradeClickOff.style.setProperty('display', 'block');

	//Update Sub Screen with Badge Specific Info
	updateSubScreen(allBadges[4]);
	currentBadge = allBadges[4];

	console.log('Badge 5 Click');

});
//
//Badge Clicks to open upgradeClickOff
badge6.addEventListener('click', function(){

	//show Sub Screen
	upgradeSubScreen.style.setProperty('display', 'flex');

	//show Behind Click Off Screen
	upgradeClickOff.style.setProperty('display', 'block');

	//Update Sub Screen with Badge Specific Info
	updateSubScreen(allBadges[5]);
	currentBadge = allBadges[5];

	console.log('Badge 6 Click');

});
//
//Badge Clicks to open upgradeClickOff
badge7.addEventListener('click', function(){
	
	//show Sub Screen
	upgradeSubScreen.style.setProperty('display', 'flex');

	//show Behind Click Off Screen
	upgradeClickOff.style.setProperty('display', 'block');

	//Update Sub Screen with Badge Specific Info
	updateSubScreen(allBadges[6]);
	currentBadge = allBadges[6];

	console.log('Badge 7 Click');

});
//
//Badge Clicks to open upgradeClickOff
badge8.addEventListener('click', function(){

	//show Sub Screen
	upgradeSubScreen.style.setProperty('display', 'flex');

	//show Behind Click Off Screen
	upgradeClickOff.style.setProperty('display', 'block');

	//Update Sub Screen with Badge Specific Info
	updateSubScreen(allBadges[7]);
	currentBadge = allBadges[7];

	console.log('Badge 8 Click');

});
//
//Badge Clicks to open upgradeClickOff
badge9.addEventListener('click', function(){

	//show Sub Screen
	upgradeSubScreen.style.setProperty('display', 'flex');

	//show Behind Click Off Screen
	upgradeClickOff.style.setProperty('display', 'block');

	//Update Sub Screen with Badge Specific Info
	updateSubScreen(allBadges[8]);
	currentBadge = allBadges[8];

	console.log('Badge 9 Click');

});
//
//Badge Clicks to open upgradeClickOff
badge10.addEventListener('click', function(){

	//show Sub Screen
	upgradeSubScreen.style.setProperty('display', 'flex');

	//show Behind Click Off Screen
	upgradeClickOff.style.setProperty('display', 'block');

	//Update Sub Screen with Badge Specific Info
	updateSubScreen(allBadges[9]);
	currentBadge = allBadges[9];

	console.log('Badge 10 Click');

});
//
//Badge Clicks to open upgradeClickOff
badge11.addEventListener('click', function(){

	//show Sub Screen
	upgradeSubScreen.style.setProperty('display', 'flex');

	//show Behind Click Off Screen
	upgradeClickOff.style.setProperty('display', 'block');

	//Update Sub Screen with Badge Specific Info
	updateSubScreen(allBadges[10]);
	currentBadge = allBadges[10];

	console.log('Badge 11 Click');

});
//
//Badge Clicks to open upgradeClickOff
badge12.addEventListener('click', function(){

	//show Sub Screen
	upgradeSubScreen.style.setProperty('display', 'flex');

	//show Behind Click Off Screen
	upgradeClickOff.style.setProperty('display', 'block');

	//Update Sub Screen with Badge Specific Info
	updateSubScreen(allBadges[11]);
	currentBadge = allBadges[11];

	console.log('Badge 12 Click');

});


//Bonus Event
//Bonus 1
bonus1.addEventListener('click', function(){
bonusClick(1, true);
});
//
//Bonus 1 Auto Select
bonus1.addEventListener('manualClick', function(){
bonusClick(1, false);
});
//
//Bonus 2
bonus2.addEventListener('click', function(){
bonusClick(2, true);
});
//
//Bonus 2 Auto Select
bonus2.addEventListener('manualClick', function(){
bonusClick(2, false);
});
//
//Bonus 3
bonus3.addEventListener('click', function(){
bonusClick(3, true);
});
//
//Bonus 3 Auto Select
bonus3.addEventListener('manualClick', function(){
bonusClick(3, false);
});
//
//Bonus 4
bonus4.addEventListener('click', function(){
bonusClick(4, true);
});
//
//Bonus 4 Auto Select
bonus4.addEventListener('manualClick', function(){
bonusClick(4, false);
});
//
//Bonus 5
bonus5.addEventListener('click', function(){
bonusClick(5, true);
});
//
//Bonus 5 Auto Select
bonus5.addEventListener('manualClick', function(){
bonusClick(5, false);
});


//
//A-Frame Components
//
//Timer System & Event Checking
AFRAME.registerComponent('timer-system', {
//schema: {
	//bar: {type: 'number'},
	//baz: {type: 'string'}
//},

init: function () {
//System Initialization

// Set up throttling.
this.throttledFunction = AFRAME.utils.throttle(this.everySecond, 1000, this);
this.throttledFunction2 = AFRAME.utils.throttle(this.everyTack, 250, this);
this.throttledFunction3 = AFRAME.utils.throttle(this.everyMin, 60000, this);

//System
//A-Frame Scene - this

//Initialize Functions

//New Game Start
//
//Disable Coin Clicks
//Hide main #buttons
//Display #optionsOverlayStart
//
//Start New Game - Hide this menu, display screen buttons and allow coin clicks. Genie will give a 1-2 min lore intro about the nature of the game. Include a skip button to go to next slide or a skip all
//
//Language - Change Language
//Game Instructions - Basic Lore, Gameplay and Info on Events and Goals
//About | Support Game - About Studio and How to Support

//Game Settings Menu
//
//Stats - Display Player Stats
//Achievements - Display Player Achievements
//Game Instructions - Basic Lore, Gameplay and Info on Events and Goals
//About | Support Game - About Studio and How to Support
//Language - Change Language
//Reset Game - (wipes save file and reloads page to pop a new game menu)



//Save File
//
//Continusly update Player local Cookie with game info, so they can close and resume whenever
//
//The User can't manually save as it always saves, but they can display a qr code to transfer their save to a new device
//
//
//This is a multi-step process using JavaScript. Modify your page to do the following (in order, all in JavaScript)
//
//form submit event - prevent default (will stop the page from posting data to the server)
//build object of form data
//convert form data JS object to JSON using JSON.stringify()
//set JSON string to localStorage key, such as localStorage.myKey = myJSON;
//redirect the page to detail.html
//access localStorage and decode JSON




//Update Store

//End Clicker System Init
},

update: function () {
	//Do something when component's data is updated.
	//Called both when the component is initialized and whenever any of the component’s properties is updated (e.g, via setAttribute). Used to modify the entity.
},

remove: function () {
	//Do something the component or its entity is detached.
	//Called when the component is removed from the entity (e.g., via removeAttribute) or when the entity is detached from the scene. Used to undo all previous modifications to the entity.
},


tick: function (time, timeDelta) {
	//Do something on every scene tick or frame.
	//Make a minor random position change to each rain element once it completes it's anim loop.
	//Run check functions everyframe this.whatever();
	//Called on each render loop or tick of the scene. Used for continuous changes or checks.
	this.throttledFunction();  // Called once a second.
	this.throttledFunction2();  // Called once a Tack
	this.throttledFunction3();  // Called once a Min
	//console.log("A frame passed.");  // Called every frame.

},

tock: function (time, timeDelta, camera) {
	//Identical to the tick method but invoked after the scene has rendered.
	//The tock handler is used to run logic that needs access to the drawn scene before it’s pushed into the headset like postprocessing effects.
	//Called on each render loop or tick of the scene after the scene has rendererd. Used for post processing effects or other logic that needs to happen after the scene has been drawn.

},

play: function () {
	//Play
	//Called whenever the scene or entity plays to add any background or dynamic behavioroot. Also called once when the component is initialized. Used to start or resume behavioroot.
},

pause: function () {
	//Pause
	//Called whenever the scene or entity pauses to remove any background or dynamic behavioroot. Also called when the component is removed from the entity or when the entity is detached from the scene. Used to pause behavioroot.
},

updateSchema: function () {
	//updateSchema
	//Called whenever any of the component’s properties is updated. Can be used to dynamically modify the schema.
},


//Throttled Function, Every 1 Second
everySecond: function () {
// Called every second.
secElapsed++;

//If any Auto Clickers are on, run them
if(ghand1Badge.owned || ghand2Badge.owned || ghand3Badge.owned) {
	//Auto Clicker
	autoClicker();
}

//
//Events
if (eventActive) {
//Increase event duration
eventTick++;
}

//Testing
//console.log(secElapsed + " Seconds Elapsed");

//Reset every minute
if(secElapsed === 60){
	secElapsed = 0;
}

},

//Throttled Function, Every 1 Second
everyTack: function () {
	// Called every 250ms

	//Update Gold Count
	htmlGoldCounterUpdate();

},

//Throttled Function, Every 1 Second
everyMin: function () {
	// Called every 1min or 1 in-game Hour

	//Init at -1, Adjust to 7 for starting game at sunrise
	//Exception allows init to not hit any trues above while keeping min+ rules simple
	if (minElapsed === -1){
		minElapsed = 6;
		//Normally ran during newDay, run for init
		eventTimePick();

	} else if (minElapsed === 23){
		newDay(minElapsed);
	} else {
		minElapsed++;
	}

	//Testing
	console.log(minElapsed + " In-Game Time");

	//
	//Event Checker Timer and Switcher
	//
	//Midnight 0
	//Blue Moon Event 5
	if(minElapsed === blueMoonEvent.eventDailyTime){
		//Check if Event Should be Ran
		//Give an initial bonus boost to have events appear more likely the first time then go back to normal
		//If Day 1 give +50
		//Every 7 in game days after, grant a bonus increase of chance
		if(dayElapsed === 0){
			//Increase chance at beginning
			//Bonus for Completing Day 1
			event5ChanceBonus += 50;
			//Check to Run Event
			eventChecker("bluemoon");
		}else if((dayElapsed) % 7 === 0){
			//Bonus for Completing another in game Week
			event5ChanceBonus += 50;
			//Check to Run Event
			eventChecker("bluemoon");
		} else {
			//Check to Run Event
			eventChecker("bluemoon");
		}
	}

	//Sunrise 6
	//Bonus Round Event 4
	else if(minElapsed === bonusRoundEvent.eventDailyTime){
		//Check if Event Should be Ran
		//If Day 0 skip event
		//If Day 1 give +50
		//Every 7 in game days after, grant a bonus increase of chance
		if(dayElapsed === 0){
			//Skip Event Day 0, First Day
		} else if(dayElapsed === 1){
			//Bonus for Completing Day 1
			event4ChanceBonus += 50;
			//Check to Run Event
			eventChecker("bonusround");
		} else if((dayElapsed-1) % 7 === 0){
			//Bonus for Completing another in game Week
			event4ChanceBonus += 50;
			//Check to Run Event
			eventChecker("bonusround");
		} else {
			//Check to Run Event
			eventChecker("bonusround");
		}
	}

	//Noon 11
	//High Noon Event 1
	else if(minElapsed === highNoonEvent.eventDailyTime){
		//Check if Event Should be Ran
		//Give an initial bonus boost to have events appear more likely the first time then go back to normal
		//If Day 1 give +50
		//Every 7 in game days after, grant a bonus increase of chance
		if(dayElapsed === 0){
			//Increase chance at beginning
			//Bonus for Completing Day 1
			event1ChanceBonus += 50;
			//Check to Run Event
			eventChecker("highnoon");
		}else if((dayElapsed) % 7 === 0){
			//Bonus for Completing another in game Week
			event1ChanceBonus += 50;
			//Check to Run Event
			eventChecker("highnoon");
		} else {
			//Check to Run Event
			eventChecker("highnoon");
		}
	}

	//Sunset 6
	//Cosmic Aurora Event 7
	else if(minElapsed === cosmicAuroraEvent.eventDailyTime ){
		//Check if Event Should be Ran
		//Give an initial bonus boost to have events appear more likely the first time then go back to normal
		//Every 7 in game days after, grant a bonus increase of chance
		if(dayElapsed === 0){
			//Increase chance at beginning
			//Bonus for Completing Day 1
			event7ChanceBonus += 40;
			//Check to Run Event
			eventChecker("cosmicaurora");
		}else if((dayElapsed) % 7 === 0){
			//Bonus for Completing another in game Week
			event7ChanceBonus += 40;
			//Check to Run Event
			eventChecker("cosmicaurora");
		} else {
			//Check to Run Event
			eventChecker("cosmicaurora");
		}
	}

	//Random Time - Morning, Afternoon, Evening, Night 8, 15, 20, 3
	//Gold Coin Storm
	else if(minElapsed === goldCoinStormEvent.eventDailyTime){
		//Check if Event Should be Ran
		//If Day 0 give +50
		//Every 7 in game days after, grant a bonus increase of chance
		if(dayElapsed === 0){
			//Bonus for Completing Day 1
			event2ChanceBonus += 50;
			//Check to Run Event
			eventChecker("goldcoinstorm");
		} else if(dayElapsed % 7 === 0){
			//Bonus for Completing another in game Week
			event2ChanceBonus += 50;
			//Check to Run Event
			eventChecker("goldcoinstorm");
		} else {
			//Check to Run Event
			eventChecker("goldcoinstorm");
		}
	}

	//Random Time - Morning, Afternoon, Evening, Night 8, 15, 20, 3
	//Rival Genie Challenge
	else if(minElapsed === genieChallengeEvent.eventDailyTime){
		//Check if Event Should be Ran
		//If Day 0 skip event
		//If Day 1 give +50
		//Every 7 in game days after, grant a bonus increase of chance
		if(dayElapsed === 0){
			//Bonus for Completing Day 1
			event3ChanceBonus += 10;
			//Check to Run Event
			eventChecker("rivalgenie");
		} else if(dayElapsed % 7 === 0){
			//Bonus for Completing another in game Week
			event3ChanceBonus += 15;
			//Check to Run Event
			eventChecker("rivalgenie");
		} else {
			//Check to Run Event
			eventChecker("rivalgenie");
		}
	}

	//Random Time - Morning, Afternoon, Evening, Night 8, 15, 20, 3
	//Hades Prowl
	else if(minElapsed === hadesProwlEvent.eventDailyTime){
		//Check if Event Should be Ran
		//If Day 0 skip event
		//If Day 1 give +50
		//Every 7 in game days after, grant a bonus increase of chance
		if(dayElapsed === 0){
			//Skip Event Day 0, First Day

			//Check to Run Event
			eventChecker("hadesprowl");
		} else if(dayElapsed === 1){
			//Bonus for Completing Day 1
			event6ChanceBonus += 10;
			//Check to Run Event
			eventChecker("hadesprowl");
		} else if((dayElapsed-1) % 7 === 0){
			//Bonus for Completing another in game Week
			event6ChanceBonus += 15;
			//Check to Run Event
			eventChecker("hadesprowl");
		} else {
			//Check to Run Event
			eventChecker("hadesprowl");
		}
	}

    },


//End A-Frame Component
});



}, 250); //Delay