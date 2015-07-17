---
layout: post
title: Simulated Annealing for Dirichlet Priors in LDA
---

When estimating the parameters of the LDA (Latent Dirichlet Allocation)
model using Gibbs sampling, if we set the Dirichlet priors to the 
fixed target values (usually small), then we reduce the mixing of
the samples from the target distribution from the beginning,
even though we haven't found a good approximation yet.

An alternative would be to initialise the Dirichlet priors
with relatively high parameters alpha, and then gradually decrease
them during burn-in period. This will allod the sampler to locate
the approximate area of interest faster at the initial stages,
while still sampling at the target prior values after burn-in.

This article describes application of simulated annealing technique for 
MCMC inference of multinomial random distributions with Dirichlet priors in LDA. 
It is implemented in my NLP library for optimised Gibbs sampling for LDA 
(see <a href="{{ site.baseurl }}software">software</a>).
The full article can be <a 
href="{{ site.baseurl }}resources/pdf/akuz_sim_ann_lda.pdf">found here</a> (PDF). 

<img src="{{ site.baseurl }}resources/images/SimAnn2.png" alt="SimAnn2" 
width="300" height="50" class="size-full wp-image-193" />


