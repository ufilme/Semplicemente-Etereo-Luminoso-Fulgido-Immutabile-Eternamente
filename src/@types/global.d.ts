import mongoose from 'mongoose';

declare global {
  var mongoose: {
    promise: Promise<Mongoose> | null;
    conn: Mongoose | null;
  };
}

export {};