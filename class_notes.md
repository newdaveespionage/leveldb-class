LevelDB Notes
=============

Setup:
------
sudo npm i n -g
sudo n 0.11.10
sudo npm i levelmeup -g
sudo npm i -g lev

Overview:
---------
- Key/Value store
- Key prefixes
- Inline compression/packing
- Embeddable

Performance:
------------
Implementations
  - Facebook 
  	- already pushed upstream to Google
  	- fixes issues running on mac
  - Google (origin)
  - Hyperdex
  	- optimized
  	- actively maintained? 

Hyperdex 
- is faster than Cassandra and MongoDB

MongoDB has iterator/index issues

Why:
----
- Data persistence can be separated out from monolithic db server structure
- Highly configurable/composable
- Minimal moving parts
- Integrate at low level
- Ease of integration
- Easier to replicate than commercial SQL solutions
- Super happy fun node api capacity woo

How:
----
- work through levelmeup

Structure:
----------
- uses bloom filters to identify interesting data
- https://www.jasondavies.com/bloomfilter/
- lookup time is o (log) n

Distribution:
-------------
- Using cloud pings
- Using multicast

Methods:
--------

Primitives
- Put
- Get
- Delete
- Iterator (operates over a range)

Primitive Atomic
- Batch (similar to transactional, atomic scale parallel operations)

