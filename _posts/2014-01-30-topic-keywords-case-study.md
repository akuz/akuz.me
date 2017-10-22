---
layout: post
title: Topic Keywords Case Study
---

I present a case study on a corpus of 10,000 news articles.
We will investigate the topic structure of the corpus, by gradually
"freezing" the topics through specifying their keywords, and seeing
what other topics come up. The process shows how you can extract
useful topics from your corpus, such that these topics would provide
a meaningful basis for topic detection in future articles.

<pre>
-------------------------------------------------------------------
#: 0008  P: .0449    protests
-------------------------------------------------------------------

.0374 police     .0353 protesters .0180 killed     .0155 charged
.0148 government .0116 ukraine    .0112 man        .0110 clashes
.0110 officer    .0108 anti       .0096 kiev       .0090 street
</pre>

<!--more-->

Limitations: 10,000 new articles represent approximately only 2 days
of news from 400 top world newspapers and blogs. Therefore, the topic
structure will be highly biased to the events reported during this
period. Also, I will only use 250 Gibbs sampling iterations after
burn in to infer the topics.

The details of the configuration parameters are provided in the
`README` file of the of `akuz-java-nlp-run-lda` package from the
`akuz-java` library. Please see <a href="{{ site.baseurl}}software">software</a>
page for more details.

First, we run `akuz-java-nlp-run-lda.sh` with the following topics config:

<pre>
[
        {
                "id": "noise",
                "proportion": 0.5
        },
        {
                "id" : "other",
                "count": 20,
                "proportion": 0.025
        }
]
</pre>

With this config, we specify that we want to extract one topic with a
very high proportion, in order to extract a topic that would cover
a lot of frequent words, which are not stop words. We assign smaller
proportions to other 20 topics, so they would capture less wide spread
topics (both across the documents and words).

Here are the top words for the first "noise" topic:

<pre>
-------------------------------------------------------------------
#: 0001  P: .2065    noise
-------------------------------------------------------------------

.0060 people     .0048 work       .0043 story      .0034 good
.0032 start      .0031 change     .0030 long       .0029 made
.0029 think      .0027 right      .0027 very       .0027 business
.0027 find       .0024 best       .0023 place      .0022 help
.0022 life       .0022 might      .0021 part       .0021 called
.0021 past       .0019 question   .0019 success    .0018 person
.0018 name       .0018 turned     .0018 believe    .0017 big
.0017 ago        .0017 power      .0017 watch      .0017 article
.0017 different  .0017 means      .0016 book       .0016 better
.0016 play       .0016 run        .0016 old        .0016 brand
.0016 real       .0016 general    .0016 great      .0015 actually
.0015 continue   .0015 each       .0015 problem    .0015 money
.0015 hand       .0015 feel       .0015 let        .0014 created
.0014 conversati .0014 important  .0014 fact       .0014 less
.0014 something  .0014 open       .0013 point      .0013 list
.0013 city       .0013 lot        .0013 often      .0013 reason
.0013 enough     .0013 explains   .0013 love       .0013 little
.0013 number     .0013 bring      .0012 known      .0012 idea
.0012 never      .0012 critical   .0012 without    .0012 trying
.0012 interest   .0012 hard       .0012 keep       .0012 history
.0012 tell       .0012 effect     .0012 bad        .0012 same
.0011 american   .0011 stop       .0011 possible   .0011 view
.0011 almost     .0011 review     .0011 final      .0011 happened
.0011 given      .0011 head       .0011 complete   .0011 decades
.0011 always     .0011 age        .0010 told       .0010 leading
</pre>

As you can see, this topic is very generic, as expected.
On average, about 20% of all corpus words were allocated to
this topic during sampling.

Let us now have a look at some of the other topics:

<pre>
-------------------------------------------------------------------
#: 0002  P: .0306    other_1
-------------------------------------------------------------------

.0190 health     .0166 obama      .0140 state      .0134 christie
.0130 president  .0101 care       .0092 chris      .0086 election
.0086 governor   .0082 public     .0080 article    .0072 law
.0067 political  .0066 republican .0066 run        .0065 administra
.0063 jersey     .0063 part       .0062 house      .0060 insurance
.0060 bill       .0060 doctors    .0058 gov        .0054 government
.0053 plans      .0053 david      .0053 american   .0052 patients
.0051 california .0051 vote       .0046 scandal    .0045 term
.0044 washington .0042 speech     .0042 reform     .0042 change
.0042 abortion   .0041 poll       .0040 democrats  .0038 fix
.0038 senate     .0037 former     .0036 commission .0036 legislatio
.0036 party      .0036 inaugurati .0034 beckham    .0034 members
.0034 coverage   .0033 u.s.       .0033 address    .0033 presidenti
.0033 national   .0032 gym        .0032 reuters    .0032 healthcare
.0031 medical    .0031 campaign   .0031 official   .0030 nhs
.0029 voters     .0029 launch     .0029 associatio .0028 barack
.0028 support    .0028 white      .0028 obamacare  .0027 hospital
.0027 trump      .0026 stop       .0025 long       .0025 head
.0025 girl       .0024 candidate  .0024 sports     .0024 expected
.0024 schwarzene .0024 cuomo      .0024 requires   .0024 approval
.0023 arnold     .0023 george     .0023 congress   .0023 think
.0023 joined     .0023 lead       .0022 target     .0022 balloon
.0022 sen        .0022 parliament .0021 victoria   .0021 workers
.0021 union      .0021 budget     .0020 report     .0020 measure
.0020 york       .0020 seeking    .0020 race       .0020 lawmakers

-------------------------------------------------------------------
#: 0003  P: .0352    other_2
-------------------------------------------------------------------

.0379 protesters .0217 police     .0174 government .0158 killed
.0146 ukraine    .0120 kiev       .0119 minister   .0114 emergency
.0096 state      .0093 people     .0089 clashes    .0084 capital
.0081 anti       .0074 leader     .0072 violence   .0071 president
.0069 officials  .0067 prime      .0065 ukrainian  .0064 country
.0062 laws       .0061 attacks    .0060 pakistan   .0059 bomb
.0053 demonstrat .0053 european   .0051 dead       .0050 reuters
.0050 streets    .0050 declared   .0049 force      .0047 central
.0046 india      .0046 political  .0046 shot       .0044 union
.0043 against    .0041 thailand   .0040 city       .0040 opposition
.0040 bangkok    .0039 riot       .0039 control    .0039 died
.0038 eu         .0037 group      .0037 russia     .0036 officers
.0035 republic   .0035 mass       .0034 delhi      .0032 arms
.0032 african    .0031 amid       .0031 escalating .0030 gay
.0029 thai       .0029 spanish    .0029 reported   .0029 viktor
.0029 violent    .0028 parliament .0028 face       .0028 power
.0028 activists  .0028 crisis     .0027 warning    .0027 authoritie
.0027 brussels   .0027 wounded    .0027 demands    .0026 car
.0026 area       .0025 national   .0025 fight      .0025 imposed
.0025 text       .0024 indian     .0024 pro        .0024 video
.0024 hit        .0024 message    .0022 movement   .0022 injured
.0022 local      .0022 militants  .0022 told       .0022 senior
.0022 sent       .0022 fears      .0022 ministry   .0021 turkey
.0021 chief      .0021 response   .0021 province   .0020 pakistani
.0020 members    .0020 security   .0020 target     .0019 attempt
</pre>

You can see the complete list of topics
<a href="{{ site.baseurl}}resources/txt/topics_1.txt">here</a>.

We can now see that we would perhaps with to detect some of these
topics in the future articles, so we need to infer more relevant
words, independent from other topics. Let's specify topics
configuration for the next attempt as follows:

<pre>
[
	{
		"id": "noise",
		"proportion": 0.5
	},
	{
		"id" : "us_gov",
		"proportion": 0.025,
		"priorityWords": [
			"government",
			"obama",
			"state",
			"president",
			"republican",
			"democrat",
			"senate",
			"party"
		]
	},
	{
		"id" : "protests",
		"proportion": 0.025,
		"priorityWords": [
			"government",
			"protest",
			"police",
			"clashes",
			"anti",
			"streets"
		]
	},
	{
		"id" : "other",
		"count": 18,
		"proportion": 0.025
	}
]
</pre>

Here are the first few topics from this run:

<pre>
-------------------------------------------------------------------
#: 0001  P: .2081    noise
-------------------------------------------------------------------

.0062 people     .0058 work       .0036 story      .0033 think
.0032 good       .0032 start      .0031 long       .0030 change
.0029 made       .0027 business   .0026 find       .0024 very
.0023 right      .0022 life       .0022 help       .0022 best
.0021 part       .0021 might      .0021 job        .0021 question
.0021 place      .0020 run        .0020 turned     .0019 less
.0019 past       .0019 money      .0018 person     .0018 watch
.0017 called     .0017 ago        .0017 hand       .0017 success
.0017 let        .0017 different  .0016 believe    .0016 means
.0016 better     .0016 each       .0016 big        .0016 created
.0016 great      .0015 book       .0015 actually   .0015 article
.0015 continue   .0015 lot        .0014 problem    .0014 something
.0014 open       .0014 feel       .0014 old        .0014 power
.0014 important  .0014 same       .0014 little     .0014 age
.0014 never      .0014 name       .0013 known      .0013 brand
.0013 history    .0013 without    .0013 possible   .0013 conversati
.0013 fact       .0013 explains   .0013 often      .0013 point
.0013 reason     .0013 idea       .0013 play       .0013 almost
.0013 told       .0012 happened   .0012 hard       .0012 bring
.0012 bad        .0012 view       .0012 course     .0012 trying
.0012 critical   .0012 head       .0012 interest   .0012 generation
.0011 real       .0011 enough     .0011 number     .0011 hours
.0011 effect     .0011 hope       .0011 response   .0011 list
.0010 model      .0010 tell       .0010 always     .0010 events
.0010 keep       .0010 friends    .0010 stop       .0010 whether

-------------------------------------------------------------------
#: 0002  P: .0591    us_gov
-------------------------------------------------------------------

.0161 party      .0158 syria      .0157 president  .0127 government
.0116 davos      .0115 minister   .0112 syrian     .0108 peace
.0108 state      .0095 olympics   .0091 leaders    .0091 political
.0084 obama      .0077 war        .0071 sochi      .0071 pope
.0071 democrats  .0063 christie   .0062 country    .0062 republican
.0061 governor   .0061 economic   .0060 lord       .0057 switzerlan
.0057 meeting    .0057 forum      .0057 prime      .0056 assad
.0051 election   .0051 secretary  .0050 called     .0050 opposition
.0048 rennard    .0048 former     .0046 russia     .0045 european
.0045 francis    .0045 russian    .0045 clegg      .0044 mp
.0043 reuters    .0042 foreign    .0041 national   .0041 chris
.0040 senate     .0039 winter     .0038 visit      .0038 conference
.0038 un         .0038 gov        .0037 conflict   .0036 accused
.0036 lib        .0036 dems       .0035 john       .0034 threat
.0034 civil      .0034 discuss    .0033 al         .0033 internatio
.0032 putin      .0032 nick       .0031 wife       .0031 mcdonnell
.0031 iran       .0031 claims     .0031 against    .0030 scandal
.0030 officials  .0030 tory       .0030 bashar     .0029 cameron
.0029 eu         .0029 liberal    .0029 ban        .0029 labour
.0029 conservati .0028 virginia   .0028 security   .0028 jersey
.0028 david      .0028 power      .0027 accepting  .0027 face
.0027 charges    .0027 committee  .0027 urged      .0027 aid
.0027 games      .0027 plans      .0027 report     .0027 geneva
.0026 invitation .0025 opening    .0025 kerry      .0025 u.s.
.0024 union      .0024 allegation .0024 japan      .0024 house

-------------------------------------------------------------------
#: 0003  P: .0566    protests
-------------------------------------------------------------------

.0348 police     .0286 protesters .0218 killed     .0127 court
.0122 government .0111 attack     .0101 man        .0093 ukraine
.0091 officer    .0089 clashes    .0088 anti       .0084 street
.0081 death      .0077 kiev       .0075 arrested   .0073 charged
.0065 emergency  .0064 people     .0059 shot       .0059 state
.0058 murder     .0056 suspected  .0054 dead       .0051 shooting
.0049 trial      .0049 against    .0049 told       .0048 bomb
.0046 violence   .0046 victim     .0046 reported   .0044 force
.0044 officials  .0043 executed   .0043 israel     .0042 capital
.0041 former     .0041 ukrainian  .0041 authoritie .0040 pakistan
.0040 convicted  .0040 minister   .0037 jail       .0037 crime
.0037 prison     .0036 alleged    .0036 texas      .0035 university
.0035 militant   .0035 reuters    .0033 accused    .0033 jury
.0033 targets    .0032 assault    .0032 search     .0032 al
.0032 case       .0031 demonstrat .0031 city       .0031 security
.0030 country    .0030 purdue     .0030 gun        .0030 sentenced
.0030 justice    .0029 evidence   .0029 terror     .0028 face
.0028 suicide    .0028 prosecutor .0027 died       .0027 declared
.0027 israeli    .0027 leader     .0026 wife       .0026 fight
.0026 investigat .0026 drug       .0025 appeal     .0025 bangkok
.0024 mexican    .0024 woman      .0024 men        .0024 thailand
.0024 british    .0023 internatio .0023 roache     .0023 national
.0022 chief      .0022 wounded    .0022 fire       .0022 laws
.0022 riot       .0022 military   .0021 delhi      .0021 black
.0021 boy        .0021 supreme    .0021 violent    .0021 injured

-------------------------------------------------------------------
#: 0004  P: .0238    other_1
-------------------------------------------------------------------

.0268 south      .0159 icahn      .0149 mine       .0149 ebay
.0119 chemical   .0118 african    .0096 carl       .0095 africa
.0094 king       .0093 activist   .0085 board      .0081 investor
.0078 korea      .0076 apple      .0075 paypal     .0069 west
.0069 harry      .0068 company    .0065 candy      .0065 spin
.0064 diamond    .0063 stake      .0062 proposal   .0061 blue
.0060 reuters    .0058 officials  .0057 russian    .0053 miners
.0050 million    .0049 prince     .0049 dave       .0047 north
.0044 country    .0044 rare       .0044 coal       .0044 afghanista
.0043 spill      .0042 central    .0042 reported   .0040 travis
.0039 crush      .0039 trademark  .0038 blast      .0037 maker
.0036 nelson     .0036 released   .0036 republic   .0035 american
.0034 lee        .0034 statue     .0033 mandela    .0032 troops
.0032 martin     .0032 inc        .0031 virginia   .0029 push
.0029 water      .0029 sudan      .0029 hold       .0028 called
.0027 saga       .0027 mondelez   .0026 billion    .0026 state
.0026 afghan     .0026 group      .0025 rabbit     .0025 capital
.0025 dj         .0024 separate   .0024 internatio .0024 wainaina
.0024 killed     .0024 sign       .0024 platinum   .0023 worth
.0023 disclosed  .0023 business   .0022 nominated  .0022 luther
.0022 tells      .0022 battle     .0022 jr         .0022 pole
.0022 auction    .0021 red        .0021 discovered .0021 dow
.0021 journalist .0021 groped     .0021 kabul      .0021 ear
.0020 korean     .0020 veteran    .0020 cross      .0020 told
.0019 added      .0019 spinoff    .0019 updates    .0019 press

-------------------------------------------------------------------
#: 0005  P: .0506    other_2
-------------------------------------------------------------------

.0133 health     .0128 government .0119 state      .0104 public
.0104 law        .0097 university .0093 u.s.       .0073 students
.0066 article    .0065 national   .0064 obama      .0064 court
.0064 report     .0061 care       .0061 bill       .0060 snowden
.0054 american   .0053 security   .0052 education  .0051 nsa
.0050 agency     .0050 patients   .0047 president  .0047 college
.0046 federal    .0046 union      .0046 drug       .0044 part
.0044 rules      .0043 study      .0042 protect    .0040 medical
.0040 administra .0040 informatio .0039 commission .0039 plan
.0038 edward     .0038 pay        .0038 independen .0038 tax
.0037 insurance  .0037 vote       .0036 approval   .0035 allow
.0035 case       .0035 spy        .0034 service    .0034 officials
.0034 documents  .0034 foreign    .0033 program    .0033 doctor
.0032 concerns   .0032 change     .0032 decision   .0031 act
.0031 issues     .0030 support    .0029 filed      .0029 school
.0029 proposed   .0029 policy     .0028 rights     .0028 legal
.0028 workers    .0028 reform     .0028 data       .0027 collection
.0027 system     .0026 election   .0026 seeking    .0026 former
.0025 supreme    .0025 benefits   .0025 provide    .0025 members
.0025 help       .0025 legislatio .0024 department .0024 healthcare
.0024 trial      .0024 measure    .0023 enforcemen .0023 according
.0023 investigat .0023 force      .0023 required   .0023 budget
.0023 offering   .0023 human      .0022 challenge  .0022 reuters
.0022 panel      .0022 hospital   .0021 major      .0021 united
.0021 secret     .0021 transparen .0021 russia     .0021 requests
</pre>

You can see the complete list of topics
<a href="{{ site.baseurl}}resources/txt/topics_2.txt">here</a>.

First, you might find it interesting that the inference has brought
up additional high-probability words into the us_gov and protests
topics. This might be a useful feature in itself, if your goal is
to see what words are correlated (within a topic) with the keywords.

Second, specification of the "frozen" topics (through keywords)
lets the algorithm to separate the other topics more clearly.
For example, we might see that even though we have allocated
the whole topic to us_gov (which mainly concentrated in the
international issues), we can see that an additional topic
about US healthcare has come up.

Let's now dedicate a new topic to US healthcare in configuration.
Additionally, let's specify another topic to capture the words
related to the film industry:

<pre>
[
	{
		"id": "noise",
		"proportion": 0.5
	},
	{
		"id" : "us_gov",
		"proportion": 0.025,
		"priorityWords": [
			"government",
			"obama",
			"state",
			"president",
			"republican",
			"democrat",
			"senate",
			"party"
		]
	},
	{
		"id" : "us_health",
		"proportion": 0.025,
		"priorityWords": [
			"government",
			"healthcare",
			"health",
			"care",
			"obamacare",
			"bill",
			"federal",
			"medical",
			"plan",
			"law"
		]
	},
	{
		"id" : "film",
		"proportion": 0.025,
		"priorityWords": [
			"movie",
			"film",
			"star",
			"red",
			"carpet"
		]
	},
	{
		"id" : "protests",
		"proportion": 0.025,
		"priorityWords": [
			"government",
			"protest",
			"police",
			"clashes",
			"anti",
			"streets"
		]
	},
	{
		"id" : "other",
		"count": 16,
		"proportion": 0.025
	}
]
</pre>

Here are some of the topics inferred using this configuration:

<pre>
-------------------------------------------------------------------
#: 0001  P: .2153    noise
-------------------------------------------------------------------

.0065 people     .0053 work       .0038 story      .0031 good
.0030 think      .0030 made       .0030 long       .0029 start
.0029 right      .0029 life       .0028 change     .0027 find
.0025 very       .0022 business   .0021 best       .0020 help
.0020 turned     .0020 place      .0019 part       .0019 great
.0018 past       .0018 run        .0018 watch      .0018 success
.0018 question   .0017 might      .0017 job        .0016 book
.0016 american   .0016 better     .0016 hand       .0016 less
.0016 person     .0015 ago        .0015 open       .0015 continue
.0015 different  .0015 called     .0015 power      .0015 each
.0015 let        .0014 old        .0014 means      .0014 without
.0014 problem    .0014 big        .0013 little     .0013 something
.0013 brand      .0013 conversati .0013 play       .0013 feel
.0013 critical   .0013 often      .0013 told       .0013 article
.0013 model      .0013 tell       .0013 human      .0013 explains
.0013 known      .0013 actually   .0012 trying     .0012 bad
.0012 fact       .0012 idea       .0012 money      .0012 head
.0012 important  .0012 lot        .0012 name       .0012 effect
.0012 age        .0012 never      .0012 public     .0012 high
.0012 event      .0012 history    .0011 created    .0011 enough
.0011 food       .0011 reason     .0011 same       .0011 real
.0011 general    .0011 hard       .0011 view       .0011 join
.0011 meeting    .0011 interest   .0011 face       .0011 bring
.0011 review     .0010 happened   .0010 response   .0010 women
.0010 stop       .0010 home       .0010 almost     .0010 list

-------------------------------------------------------------------
#: 0002  P: .0526    us_gov
-------------------------------------------------------------------

.0206 president  .0182 party      .0175 syria      .0167 obama
.0165 government .0128 minister   .0125 state      .0120 syrian
.0119 peace      .0111 political  .0083 leaders    .0082 war
.0081 election   .0080 democrats  .0078 pope       .0074 christie
.0071 lord       .0066 prime      .0066 republican .0063 assad
.0060 mp         .0058 opposition .0058 called     .0057 meet
.0055 house      .0055 secretary  .0054 rennard    .0052 foreign
.0052 senate     .0050 francis    .0050 clegg      .0047 chris
.0046 switzerlan .0044 accused    .0044 country    .0043 conference
.0042 visit      .0042 support    .0042 vote       .0042 civil
.0041 conflict   .0041 john       .0040 lib        .0040 dems
.0039 european   .0038 labour     .0038 david      .0037 al
.0037 union      .0037 nick       .0036 claims     .0036 national
.0036 sexual     .0036 governor   .0036 un         .0035 aid
.0034 speech     .0034 white      .0034 cameron    .0033 tory
.0033 against    .0033 jersey     .0033 bashar     .0032 gov
.0032 scandal    .0032 liberal    .0032 urged      .0032 eu
.0031 power      .0031 conservati .0030 report     .0030 ban
.0030 reuters    .0029 south      .0029 geneva     .0028 kerry
.0028 parliament .0028 negotiatio .0028 iran       .0028 former
.0027 face       .0027 campaign   .0027 invitation .0027 crimes
.0026 internatio .0026 discuss    .0026 address    .0026 decision
.0026 reform     .0025 torture    .0025 refugees   .0025 issue
.0024 begin      .0024 hope       .0024 opening    .0024 run
.0024 abortion   .0024 barack     .0024 action     .0023 general

-------------------------------------------------------------------
#: 0003  P: .0426    us_health
-------------------------------------------------------------------

.0180 health     .0178 court      .0176 bill       .0167 law
.0138 government .0126 state      .0120 public     .0120 rules
.0115 plan       .0109 u.s.       .0106 care       .0106 tax
.0097 federal    .0081 medical    .0069 pay        .0064 drug
.0062 healthcare .0062 workers    .0062 legal      .0062 approval
.0061 supreme    .0059 insurance  .0058 judge      .0057 patients
.0057 filed      .0057 regulators .0053 pension    .0051 national
.0050 part       .0049 appeal     .0048 city       .0048 obamacare
.0047 case       .0047 reuters    .0045 system     .0045 union
.0043 san        .0041 texas      .0041 francisco  .0040 united
.0039 protect    .0039 safety     .0039 car        .0038 test
.0038 poor       .0038 claims     .0038 proposed   .0038 execution
.0037 employees  .0037 justice    .0037 cut        .0036 gates
.0036 officials  .0034 challenge  .0034 crash      .0033 hospital
.0033 stop       .0033 against    .0032 administra .0032 council
.0032 child      .0031 benefits   .0031 doctors    .0031 article
.0031 order      .0031 allow      .0030 high       .0030 detroit
.0030 enforcemen .0030 million    .0029 companies  .0029 mexican
.0029 trial      .0028 decision   .0028 service    .0028 accounting
.0027 standards  .0027 bankruptcy .0027 treasury   .0027 tech
.0027 warned     .0027 seeking    .0026 rejected   .0026 transparen
.0026 local      .0026 lawsuit    .0026 required   .0026 private
.0025 issues     .0025 forced     .0025 transport  .0025 authoritie
.0024 failed     .0024 washington .0024 eu         .0024 measure
.0023 report     .0023 study      .0023 face       .0023 audit

-------------------------------------------------------------------
#: 0004  P: .0428    film
-------------------------------------------------------------------

.0274 star       .0231 film       .0149 awards     .0135 united
.0122 movie      .0110 red        .0093 manchester .0087 carpet
.0072 music      .0064 revealed   .0064 play       .0062 tv
.0061 chelsea    .0059 season     .0057 television .0057 arsenal
.0055 city       .0053 festival   .0053 celebrity  .0052 night
.0052 series     .0052 man        .0049 actor      .0048 big
.0047 best       .0046 club       .0044 sundance   .0043 transfer
.0042 david      .0041 national   .0041 oscar      .0041 london
.0038 sign       .0038 album      .0037 performanc .0036 nominated
.0035 mata       .0035 bbc        .0034 girls      .0034 final
.0034 dance      .0033 feature    .0033 hollywood  .0032 grammy
.0031 liverpool  .0031 screen     .0031 fans       .0031 love
.0031 winner     .0030 former     .0030 role       .0029 premier
.0029 voice      .0028 tonight    .0028 episode    .0028 video
.0027 win        .0027 league     .0027 drama      .0027 actress
.0027 debut      .0026 leave      .0026 documentar .0026 pop
.0026 hit        .0026 appear     .0025 brother    .0025 paul
.0025 watch      .0025 join       .0025 character  .0025 beckham
.0025 director   .0025 disney     .0024 jennifer   .0024 sherlock
.0024 deal       .0023 stage      .0023 cast       .0023 striker
.0023 madrid     .0023 script     .0022 ntas       .0022 leak
.0022 report     .0022 juan       .0022 street     .0022 viewers
.0021 russell    .0021 radio      .0021 tarantino  .0021 target
.0021 park       .0020 singer     .0020 present    .0020 return
.0020 claims     .0020 tottenham  .0020 confirmed  .0020 broadway

-------------------------------------------------------------------
#: 0005  P: .0499    protests
-------------------------------------------------------------------

.0361 police     .0317 protesters .0214 killed     .0143 street
.0122 government .0105 ukraine    .0104 attack     .0100 clashes
.0091 man        .0091 anti       .0087 officer    .0087 kiev
.0083 court      .0071 people     .0070 arrested   .0070 shot
.0069 emergency  .0066 death      .0064 told       .0062 murder
.0061 reported   .0060 shooting   .0056 israel     .0054 capital
.0053 bomb       .0053 violence   .0051 dead       .0050 state
.0048 assault    .0047 ukrainian  .0046 pakistan   .0045 wall
.0045 university .0044 victim     .0043 trial      .0042 force
.0040 charged    .0040 suspected  .0039 authoritie .0037 officials
.0037 al         .0036 prison     .0036 demonstrat .0036 died
.0036 against    .0035 targets    .0035 convicted  .0034 purdue
.0034 wolf       .0033 declared   .0032 jail       .0032 leader
.0032 alleged    .0031 reuters    .0030 militant   .0030 israeli
.0030 minister   .0029 workers    .0029 sentenced  .0029 woman
.0029 strike     .0029 accused    .0028 central    .0028 bangkok
.0027 thailand   .0027 injured    .0027 british    .0026 sex
.0026 face       .0026 former     .0026 roache     .0026 hill
.0025 wife       .0025 jury       .0025 security   .0025 rape
.0025 country    .0025 fire       .0024 area       .0024 wounded
.0024 delhi      .0024 gun        .0024 city       .0024 women
.0024 president  .0023 violent    .0023 armed      .0023 search
.0023 prosecutor .0023 india      .0023 mass       .0023 military
.0022 claims     .0022 lucia      .0022 escalating .0022 riot
.0021 investigat .0021 drug       .0021 thai       .0021 fatal
</pre>

You can see the complete list of topics
<a href="{{ site.baseurl}}resources/txt/topics_3.txt">here</a>.

We can detect the following issues now:

* us_gov topic mixes the news about the US and the UK — so we want to introduce new topic for UK government
* film topic mixes the news about the movies, sports and music, mostly because they mention similar words about celebrities — so we want to split these topics too

Here is an updated configuration file (please note that the
proportions will be normalised to sum up to 1 automatically,
so I don't care too much about the exact numbers):

<pre>
[
	{
		"id": "noise",
		"proportion": 0.5
	},
	{
		"id" : "us_gov",
		"proportion": 0.025,
		"priorityWords": [
			"government",
			"obama",
			"state",
			"president",
			"republican",
			"democrat",
			"senate",
			"party"
		]
	},
	{
		"id" : "uk_gov",
		"proportion": 0.025,
		"priorityWords": [
			"government",
			"parlament",
			"house",
			"lord",
			"mp",
			"clegg",
			"cameron",
			"prime",
			"minister"
		]
	},
	{
		"id" : "us_health",
		"proportion": 0.025,
		"priorityWords": [
			"government",
			"healthcare",
			"health",
			"care",
			"obamacare",
			"bill",
			"federal",
			"medical",
			"plan",
			"law"
		]
	},
	{
		"id" : "film",
		"proportion": 0.025,
		"priorityWords": [
			"movie",
			"film",
			"star",
			"red",
			"carpet"
		]
	},
	{
		"id" : "music",
		"proportion": 0.025,
		"priorityWords": [
			"music",
			"album",
			"star",
			"stage",
			"concert",
			"singer"
		]
	},
	{
		"id" : "sports",
		"proportion": 0.025,
		"priorityWords": [
			"play",
			"club",
			"star",
			"striker",
			"football",
			"premier",
			"final"
		]
	},
	{
		"id" : "protests",
		"proportion": 0.025,
		"priorityWords": [
			"government",
			"protest",
			"police",
			"clashes",
			"anti",
			"streets"
		]
	},
	{
		"id" : "other",
		"count": 15,
		"proportion": 0.025
	}
]
</pre>

Here are the inferred topics for our configuration:

<pre>
-------------------------------------------------------------------
#: 0001  P: .1980    noise
-------------------------------------------------------------------

.0063 people     .0058 work       .0048 story      .0038 long
.0035 think      .0034 good       .0034 article    .0033 start
.0031 made       .0030 right      .0028 find       .0026 very
.0024 change     .0023 best       .0023 might      .0023 part
.0022 help       .0022 question   .0022 called     .0021 run
.0021 place      .0021 life       .0019 past       .0019 believe
.0018 little     .0018 turned     .0018 less       .0018 different
.0018 general    .0018 great      .0018 means      .0017 big
.0017 point      .0017 important  .0017 continue   .0017 problem
.0017 each       .0016 person     .0016 ago        .0016 better
.0016 money      .0016 complete   .0016 hope       .0016 success
.0016 reason     .0016 same       .0016 book       .0016 hand
.0016 watch      .0016 open       .0016 power      .0016 let
.0016 something  .0015 actually   .0015 name       .0015 old
.0015 fact       .0014 number     .0014 high       .0014 trying
.0014 feel       .0014 without    .0014 often      .0014 lot
.0014 job        .0014 happened   .0014 term       .0014 explains
.0013 history    .0013 bad        .0013 critical   .0013 leading
.0013 possible   .0013 idea       .0013 never      .0013 hard
.0013 major      .0013 enough     .0013 tell       .0012 effect
.0012 view       .0012 head       .0012 known      .0012 free
.0012 course     .0012 review     .0012 position   .0012 almost
.0012 face       .0012 keep       .0012 whether    .0012 thought
.0011 short      .0011 cover      .0011 interest   .0011 response
.0011 created    .0011 bring      .0011 conversati .0011 events

-------------------------------------------------------------------
#: 0002  P: .0423    us_gov
-------------------------------------------------------------------

.0298 call       .0274 president  .0252 executive  .0221 chief
.0197 conference .0195 officer    .0186 syria      .0182 research
.0167 earnings   .0165 division   .0132 peace      .0126 operator
.0108 syrian     .0104 financial  .0095 vice       .0093 discusses
.0092 results    .0088 q4         .0088 john       .0081 ceo
.0078 inc        .0076 assad      .0075 state      .0074 government
.0074 presentati .0072 chairman   .0070 bank       .0063 obama
.0062 welcome    .0060 analysts   .0060 republican .0060 transcript
.0056 good       .0056 war        .0055 management .0052 party
.0049 relations  .0048 director   .0047 thank      .0047 senate
.0046 capital    .0044 secretary  .0044 christie   .0044 group
.0044 chris      .0044 morgan     .0043 quarter    .0043 switzerlan
.0043 democrat   .0041 corporatio .0041 bashar     .0040 senior
.0038 investor   .0038 complete   .0037 james      .0036 story
.0036 al         .0035 opposition .0035 instructio .0035 conflict
.0035 kerry      .0035 david      .0034 mr         .0033 securities
.0032 civil      .0032 participan .0032 geneva     .0030 iran
.0030 markets    .0029 member     .0028 recorded   .0028 governor
.0028 william    .0028 partners   .0027 stanley    .0027 internatio
.0026 robert     .0026 company    .0026 un         .0026 turn
.0025 paul       .0025 michael    .0025 appointed  .0025 begin
.0025 opening    .0025 suisse     .0024 ag         .0024 jersey
.0023 moon       .0022 general    .0022 lynch      .0022 ban
.0021 gov        .0021 ki         .0021 webcast    .0021 goldman
.0021 committee  .0020 sachs      .0020 ladies     .0020 montreux

-------------------------------------------------------------------
#: 0003  P: .0382    uk_gov
-------------------------------------------------------------------

.0223 minister   .0199 party      .0148 government .0134 prime
.0130 lord       .0130 political  .0120 mp         .0100 clegg
.0090 election   .0087 women      .0086 european   .0085 house
.0083 leader     .0081 country    .0079 cameron    .0073 rennard
.0073 claims     .0070 uk         .0065 eu         .0064 union
.0058 britain    .0057 labour     .0055 lib        .0055 support
.0055 democrats  .0054 dems       .0053 nick       .0053 accused
.0052 against    .0051 campaign   .0050 vote       .0047 liberal
.0046 tory       .0046 conservati .0046 david      .0046 warned
.0044 president  .0044 gay        .0044 called     .0043 benefits
.0042 sexual     .0041 parliament .0041 ruling     .0041 sex
.0041 public     .0040 allegation .0040 independen .0040 right
.0040 face       .0039 urged      .0037 greece     .0037 former
.0037 men        .0037 legal      .0037 foreign    .0036 crisis
.0035 action     .0034 secretary  .0034 refugees   .0034 female
.0033 peer       .0033 reform     .0032 ukip       .0032 politician
.0032 parlament_ .0032 harassment .0031 japan      .0031 visit
.0031 lloyds     .0031 suspended  .0030 leading    .0030 members
.0030 immigratio .0030 decision   .0030 row        .0029 told
.0029 french     .0029 power      .0029 abe        .0028 group
.0028 refused    .0028 brussels   .0028 street     .0027 scotland
.0027 reuters    .0027 questions  .0027 miliband   .0026 people
.0026 europe     .0026 commons    .0026 local      .0026 london
.0025 investigat .0025 marriage   .0025 organisati .0025 resigned
.0024 british    .0024 ed         .0024 anti       .0024 report

-------------------------------------------------------------------
#: 0004  P: .0450    us_health
-------------------------------------------------------------------

.0170 health     .0158 energy     .0153 court      .0149 government
.0140 law        .0129 plans      .0125 state      .0122 bill
.0105 care       .0100 u.s.       .0100 rules      .0092 federal
.0081 tax        .0078 targets    .0078 public     .0076 change
.0075 cut        .0074 medical    .0072 eu         .0071 pay
.0061 workers    .0060 commission .0059 legal      .0058 supreme
.0057 union      .0056 healthcare .0056 proposed   .0054 patients
.0054 cost       .0054 approval   .0053 climate    .0052 drug
.0049 judge      .0049 renewable  .0049 power      .0049 pension
.0048 national   .0046 companies  .0044 part       .0044 united
.0044 obamacare  .0044 insurance  .0043 european   .0042 filed
.0042 wage       .0041 case       .0040 appeal     .0039 obama
.0038 article    .0036 uk         .0036 retirement .0035 administra
.0035 challenge  .0035 report     .0034 reuters    .0034 claims
.0034 warned     .0034 firm       .0033 system     .0033 required
.0033 according  .0033 justice    .0032 high       .0032 reform
.0030 american   .0030 protect    .0030 hospital   .0029 emissions
.0029 policy     .0029 washington .0029 seeking    .0029 issues
.0028 allow      .0028 regulators .0027 delay      .0027 against
.0027 percent    .0026 president  .0026 forced     .0025 council
.0025 minimum    .0025 panel      .0025 fda        .0025 lawsuit
.0024 secretary  .0024 measures   .0024 decision   .0024 increase
.0024 collection .0024 audit      .0024 doctor     .0023 considered
.0023 enforcemen .0023 goals      .0023 bosses     .0023 address
.0023 reduce     .0022 deal       .0022 gas        .0022 face

-------------------------------------------------------------------
#: 0005  P: .0303    film
-------------------------------------------------------------------

.0312 film       .0253 star       .0201 movie      .0171 awards
.0147 red        .0128 street     .0115 carpet     .0103 glass
.0086 wall       .0083 revealed   .0080 television .0080 man
.0078 series     .0071 celebrity  .0069 big        .0067 night
.0065 tv         .0061 sundance   .0058 national   .0058 screen
.0057 oscar      .0056 wolf       .0054 theater    .0051 hill
.0049 girl       .0049 google     .0048 festival   .0048 season
.0047 hollywood  .0046 actor      .0045 wearing    .0043 documentar
.0043 watch      .0039 tonight    .0039 episode    .0038 nominated
.0037 jennifer   .0037 actress    .0036 robert     .0035 director
.0035 drama      .0035 best       .0034 character  .0034 disney
.0033 fans       .0033 role       .0033 sherlock   .0033 play
.0032 life       .0031 script     .0031 cast       .0031 ntas
.0031 homeland   .0031 baby       .0030 viewers    .0030 hateful
.0030 leak       .0030 featuring  .0029 tarantino  .0029 confirmed
.0029 lawrence   .0028 hit        .0028 house      .0028 winner
.0028 brother    .0028 love       .0027 son        .0027 ok
.0026 park       .0026 winning    .0026 perry      .0026 wife
.0026 picture    .0025 jonah      .0025 animated   .0025 video
.0025 beauty     .0024 ohio       .0024 filmmaker  .0024 katy
.0024 jack       .0024 scene      .0023 lohan      .0023 city
.0023 martin     .0023 dress      .0022 shock      .0022 quentin
.0022 twitter    .0022 london     .0022 nbc        .0022 expecting
.0021 scorsese   .0021 lindsay    .0020 appear     .0020 sag
.0020 comedy     .0020 producer   .0020 sam        .0019 cooper

-------------------------------------------------------------------
#: 0006  P: .0203    music
-------------------------------------------------------------------

.0375 music      .0209 star       .0168 stage      .0164 album
.0159 singer     .0126 concert    .0099 beats      .0089 record
.0085 performanc .0083 tour       .0076 breaking   .0068 voice
.0067 dance      .0066 band       .0065 video      .0064 grammy
.0059 awards     .0059 radio      .0059 appear     .0055 artist
.0054 celebrity  .0054 art        .0053 bbc        .0051 play
.0050 join       .0048 launch     .0047 pop        .0047 talent
.0046 anniversar .0045 british    .0045 song       .0044 beatles
.0042 festival   .0040 mark       .0040 inspired   .0040 debut
.0038 listen     .0037 members    .0034 event      .0034 twitter
.0033 tv         .0033 best       .0032 paul       .0032 bruce
.0031 release    .0031 broadcast  .0031 bill       .0031 human
.0030 david      .0030 special    .0030 fans       .0030 night
.0029 track      .0029 hip        .0029 boy        .0028 winning
.0028 culture    .0028 spotify    .0028 moors      .0028 ian
.0028 internatio .0026 angeles    .0026 horses     .0026 classic
.0026 york       .0026 single     .0025 bump       .0025 kylie
.0025 present    .0025 london     .0025 sir        .0025 land
.0025 murderer   .0025 streaming  .0025 solo       .0025 neil
.0025 cyrus      .0025 black      .0024 singing    .0024 contest
.0024 pussy      .0024 love       .0024 riot       .0024 cbs
.0024 tribute    .0023 age        .0023 musician   .0023 comics
.0023 ban        .0022 winner     .0022 george     .0022 honor
.0022 bones      .0022 home       .0022 museum     .0022 producer
.0022 hopes      .0022 rock       .0021 pursue     .0020 signed

-------------------------------------------------------------------
#: 0007  P: .0248    sports
-------------------------------------------------------------------

.0251 united     .0188 club       .0168 football   .0163 play
.0155 manchester .0145 star       .0138 final      .0118 striker
.0114 premier    .0108 chelsea    .0097 west       .0095 arsenal
.0083 former     .0081 transfer   .0081 city       .0074 man
.0070 abuse      .0069 player     .0066 twitter    .0062 open
.0061 game       .0059 mata       .0059 liverpool  .0057 league
.0056 charge     .0055 fans       .0055 anelka     .0055 sign
.0054 match      .0054 target     .0053 cup        .0052 deal
.0049 team       .0046 leave      .0045 season     .0044 australian
.0044 sherman    .0043 against    .0043 nfl        .0042 tottenham
.0041 collymore  .0041 defender   .0041 kim        .0040 report
.0039 federer    .0039 claims     .0039 juan       .0038 michael
.0037 gesture    .0037 madrid     .0037 san        .0037 champion
.0036 nicolas    .0035 kardashian .0035 bid        .0035 missed
.0035 ham        .0034 sports     .0033 tweets     .0033 quenelle
.0033 stadium    .0032 murray     .0032 midfielder .0031 kanye
.0031 david      .0030 andy       .0030 stan       .0029 race
.0028 fa         .0028 reportedly .0027 richard    .0027 received
.0027 everton    .0027 sunderland .0026 spurs      .0026 roger
.0026 made       .0025 goal       .0025 diego      .0025 round
.0025 sweeney    .0025 grand      .0024 real       .0024 seattle
.0023 coach      .0023 accused    .0023 racist     .0023 alison
.0023 video      .0022 hotspur    .0022 palace     .0021 bieber
.0021 reach      .0020 semi       .0020 french     .0020 championsh
.0020 messages   .0020 family     .0020 la         .0020 legend

-------------------------------------------------------------------
#: 0008  P: .0449    protests
-------------------------------------------------------------------

.0374 police     .0353 protesters .0180 killed     .0155 charged
.0148 government .0116 ukraine    .0112 man        .0110 clashes
.0110 officer    .0108 anti       .0096 kiev       .0090 street
.0086 arrested   .0084 death      .0076 people     .0076 state
.0076 emergency  .0064 former     .0060 attack     .0058 shot
.0057 court      .0057 crime      .0057 wife       .0056 report
.0056 violence   .0054 prison     .0053 capital    .0052 ukrainian
.0051 murder     .0051 pakistan   .0049 executed   .0048 convicted
.0046 prosecutor .0045 city       .0044 bomb       .0041 against
.0041 demonstrat .0041 dead       .0040 suspected  .0040 jail
.0039 trial      .0038 mcdonnell  .0038 leader     .0038 declared
.0038 accused    .0036 force      .0036 sentenced  .0036 died
.0036 evidence   .0035 torture    .0035 officials  .0035 authoritie
.0034 reuters    .0034 texas      .0034 face       .0034 vatican
.0034 drug       .0033 british    .0033 case       .0033 indicted
.0032 corruption .0031 bangkok    .0030 mexican    .0030 illegal
.0030 thailand   .0029 president  .0029 riot       .0028 opposition
.0028 gun        .0027 area       .0027 laws       .0027 fight
.0026 delhi      .0026 virginia   .0025 war        .0025 men
.0025 internatio .0025 violent    .0025 hit        .0024 wounded
.0024 lucia      .0024 political  .0024 escalating .0023 federal
.0023 thai       .0023 laundering .0023 shooting   .0022 injured
.0022 told       .0022 mass       .0022 activists  .0021 viktor
.0021 national   .0020 accepting  .0020 justice    .0020 video
.0020 smuggling  .0020 syria      .0020 heart      .0019 investigat
</pre>

You can see the complete list of topics
<a href="{{ site.baseurl}}resources/txt/topics_4.txt">here</a>.

As you can see, we now obtain topics that are very relevant to
the keywords that we specified. By providing the keywords, we
also helped the algorithm to separate the topics that would be
hard to separate without the hints. For example, the words "star"
and "play" use used in many different topics, as well as the word
"government", which originally caused topics bundling, but were
unwound once we specified the additional keywords.

However, now we can see that us_gov topic got mixed up with a
topic about corporations, where they frequently mention the word
"president" too. We can now proceed by creating a dedicated topic
for "president company conference call", and then continue our
research further.

## Conclusion

This post demonstrated the process of research that you can use
to extract "useful" topics from a corpus of texts. The "usefulness"
is defined as you knowing what "the topic is about" because you
specify the keywords.

This iterative process is useful in several ways:

* It helps to find other words correlated with the keywords you are interested in
* It helps to produce meaningful topics that would be useful for detection in the new articles

Provided that you use a corpus large enough (as it is not the
case with the current study), you can infer very generic topics,
that would provide a lot of correlated words in addition to the
keywords you specify. The richness of thus inferred topics allows
detecting them with a high precision in the future unseen documents.

Please see <a href="{{ site.baseurl }}/software">software</a> page
to get the code.