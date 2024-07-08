import {
  clusterApiUrl,
  ConfirmOptions,
  Connection,
  PublicKey,
} from "@solana/web3.js";
import idl from "./idl.json";
import { MovieReview } from "./type";
import { AnchorProvider, Program, web3 } from "@coral-xyz/anchor";

import kp from "./keypair.json";
const arr = Object.values(kp._keypair.secretKey);
const secret = new Uint8Array(arr);
const baseAccount = web3.Keypair.fromSecretKey(secret);

export const network = clusterApiUrl("devnet");
export const programID = new PublicKey(idl.address);
export const opts = {
  preflightCommitment: "processed" as ConfirmOptions,
};

async function getProvider() {
  if (window.solana) {
    await window.solana.connect({
      onlyIfTrusted: true,
    });

    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new AnchorProvider(
      connection,
      window.solana,
      opts.preflightCommitment
    );

    return provider;
  }
}

async function getConnection() {
  const connection = new Connection(network, opts.preflightCommitment);
  return connection;
}

async function getProgram() {
  const provider = await getProvider();
  return new Program<MovieReview>(JSON.parse(JSON.stringify(idl)), provider);
}

async function initializeAccount() {
  try {
    const provider = await getProvider();
    const program = await getProgram();

    await program.methods
      .initialize()
      .accountsPartial({
        reviewAccount: baseAccount.publicKey,
        user: provider?.wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      })
      .signers([baseAccount])
      .rpc();

    console.log("init done");
  } catch (error) {
    console.log(error);
  }
}

export {
  getProvider,
  getProgram,
  getConnection,
  initializeAccount,
  baseAccount,
};
