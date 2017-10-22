---
layout: page
title: Software
date: 2002-01-01
---

<p class="message">
You can find all my public code at <a href="https://github.com/akuz"><i class="fa fa-github"></i>&nbsp;github.com/akuz</a><br />
Below are just some things I wanted to highlight
</p>

The main code you would probably want to look at is optimised LDA Gibbs sampling in the `akuz-nlp` library, which includes the following enhancements over the standard implementations:

* Multiprocessor Parallelisation (you can specify thread count)
* Simulated Annealing (for faster Gibbs sampling convergence)
* Topic Keywords (specify high probability words for specific topics)

### Download Source Code

* <a href="https://github.com/akuz/akuz-java"><i class="fa fa-github"></i>&nbsp;akuz-java</a> - various Java libraries, including:
 * `akuz-nlp` - Natural Language Processing (NLP) library
 * `akuz-nlp-run-lda` - How to run LDA Gibbs sampling

### Download Test Data

The below zip files contain abstracts (or full texts, depending on the source) of news articles. Close duplicates from the same source have been removed. The data does not have source names or timestamps. First line in each file is a title.

* <a href="{{ site.baseurl }}/resources/data/news_1k.zip"><i class="fa fa-file-zip-o"></i>&nbsp;news_1k.zip</a> (416 Kb) — first 1,000 news after 1 Jan 2013, 00:00:00
* <a href="{{ site.baseurl }}/resources/data/news_10k.zip"><i class="fa fa-file-zip-o"></i>&nbsp;news_10k.zip</a> (4.3 Mb) — first 10,000 news after 1 Jan 2013, 00:00:00

To use this data with algorithms from the NLP library, unpack the archive into a directory on your computer, and then specify that directory in the parameters to the program (see `akuz-nlp-run-lda` project for an example).

