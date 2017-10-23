---
layout: post
title: Gibbs Sampling for LDA with Asymmetric Dirichlet Priors
---

The original articles on LDA (Latent Dirichlet Allocation) assume
<em>symmetric</em> Dirichlet priors on topic-words and document-topics
distributions. This means that a-priori we assume that all topics
are equally likely to appear within each document, and all words
are equally likely to appear within each topic.

<!--more-->

However, if we want to pre-configure the topics, before
seeing any data, to have some higher priority words or
be more likely to appear within each document (more
common topics), then one of the approaches would be
to specify the <em>asymmetric</em> Dirichlet priors.

I discuss one of the approaches of how to do it in a
reasonable way in the later posts. Bus for now, we
need to understand if the same Gibbs sampling
formulae apply for the model with asymmetric priors?

For this purpose, I've repeated the derivation of the
Gibbs sampling formulae for the case of the asymmetric
priors in LDA. The paper can be <a href="{{ site.baseurl }}/media/pdf/akuz_lda_asym.pdf">found here</a> (PDF).
