---
layout: post
title: LDA vs Document Clustering
---

I was asked at the interview what's the difference between LDA and document clustering. I tried to explain it by explaining the difference between generative models that are assumed for the respective models. However, now I realise it would have been much more effective to give a much simpler example.

<img src="{{ site.baseurl}}/media/img/Bread_Data.png" />

<!--more-->

Imagine you have a dataset of objects that you can broadly classify as "plain bread" and "bread with seeds". For this example, it is important that these objects share some similarity, but also have important differences:

With the document clustering approach, if you had a model that would need to group these objects into 2 clusters, then you would end up with the following results:

<img src="{{ site.baseurl}}/media/img/Bread_Cluster.png" />

However, in the LDA approach you would not be inferring the document clusters. Instead, you would be inferring the "ingredients" of the objects, i.e. what they consist of. By running the LDA on our dataset you would end up with the following result:

<img src="{{ site.baseurl}}/media/img/Bread_Ingredient.png" />

You would also get a probability of each ingredient in each object (document).

