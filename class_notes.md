LevelDB Notes
=============

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



Methods:
--------

Primitives
- Put
- Get
- Delete
- Iterator (operates over a range)

Primitive Atomic
- Batch (similar to transactional, atomic scale parallel operations)

