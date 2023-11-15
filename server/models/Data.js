import mongoose from "mongoose";
const Schema = mongoose.Schema;

//schema for questions
const QuestionSchema = new Schema({
  question: String,
  options: [String],
  correctOption: Number,
});

//schema for topics
const TopicSchema = new Schema({
  theory: String,
  questions: [QuestionSchema],
  videoLinks: [String],
});

//schema for chapters
const ChapterSchema = new Schema({
  topics: {
    type: Map,
    of: TopicSchema,
  },
});

//schema for subjects
const SubjectSchema = new Schema({
  chapters: {
    type: Map,
    of: ChapterSchema,
  },
});

//schema for classes
const ClassSchema = new Schema({
  subjects: {
    type: Map,
    of: SubjectSchema,
  },
});

//schema for the entire data structure
const DataSchema = new Schema({
  Class1: ClassSchema,
  Class2: ClassSchema,
});

//model based on the schema
const DataModel = mongoose.model('Data', DataSchema);

export default DataModel;
