use anchor_lang::prelude::*;

declare_id!("9v2QWZsYPKD6wMXdgUu4KefAqmNvPLEYMLpDEbk1kqcw");

#[program]
pub mod movie_review {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let review_account = &mut ctx.accounts.review_account;
        review_account.reviews = Vec::new();
        Ok(())
    }

    pub fn add_review(
        ctx: Context<AddReview>,
        movie_title: String,
        review: String,
        rating: u8
    ) -> Result<()> {
        let review_account = &mut ctx.accounts.review_account;

        if rating > 5 {
            return Err(ErrorCode::InvalidRating.into());
        }

        review_account.reviews.push(Review {
            movie_title,
            review,
            rating,
            reviewer: *ctx.accounts.reviewer.key,
        });

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + std::mem::size_of::<ReviewAccount>() + 1024
    )] // Adjust space as needed
    pub review_account: Account<'info, ReviewAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AddReview<'info> {
    #[account(mut)]
    pub review_account: Account<'info, ReviewAccount>,
    #[account(mut)]
    pub reviewer: Signer<'info>,
}

#[account]
pub struct ReviewAccount {
    pub reviews: Vec<Review>,
}

#[derive(Clone, Debug, AnchorSerialize, AnchorDeserialize)]
pub struct Review {
    pub movie_title: String,
    pub review: String,
    pub rating: u8,
    pub reviewer: Pubkey,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Invalid rating. The rating must be between 0 and 5.")]
    InvalidRating,
}
