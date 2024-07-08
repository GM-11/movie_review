/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/movie_review.json`.
 */
export type MovieReview = {
    "address": "HcjgSDXySxpNu27GaZd2hbmj73DXQaK7pAmpwuP6CCFF",
    "metadata": {
      "name": "movieReview",
      "version": "0.1.0",
      "spec": "0.1.0",
      "description": "Created with Anchor"
    },
    "instructions": [
      {
        "name": "addReview",
        "discriminator": [
          0,
          87,
          29,
          155,
          61,
          216,
          35,
          190
        ],
        "accounts": [
          {
            "name": "reviewAccount",
            "writable": true
          },
          {
            "name": "reviewer",
            "writable": true,
            "signer": true
          }
        ],
        "args": [
          {
            "name": "movieTitle",
            "type": "string"
          },
          {
            "name": "review",
            "type": "string"
          },
          {
            "name": "rating",
            "type": "u8"
          }
        ]
      },
      {
        "name": "initialize",
        "discriminator": [
          175,
          175,
          109,
          31,
          13,
          152,
          155,
          237
        ],
        "accounts": [
          {
            "name": "reviewAccount",
            "writable": true,
            "signer": true
          },
          {
            "name": "user",
            "writable": true,
            "signer": true
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          }
        ],
        "args": []
      }
    ],
    "accounts": [
      {
        "name": "reviewAccount",
        "discriminator": [
          119,
          177,
          213,
          232,
          143,
          161,
          255,
          66
        ]
      }
    ],
    "errors": [
      {
        "code": 6000,
        "name": "invalidRating",
        "msg": "Invalid rating. The rating must be between 0 and 5."
      }
    ],
    "types": [
      {
        "name": "review",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "movieTitle",
              "type": "string"
            },
            {
              "name": "review",
              "type": "string"
            },
            {
              "name": "rating",
              "type": "u8"
            },
            {
              "name": "reviewer",
              "type": "pubkey"
            }
          ]
        }
      },
      {
        "name": "reviewAccount",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "reviews",
              "type": {
                "vec": {
                  "defined": {
                    "name": "review"
                  }
                }
              }
            }
          ]
        }
      }
    ]
  };
  