/*
  # Create TAT Test Tables

  1. New Tables
    - `tat_images`
      - `id` (serial, primary key)
      - `url` (text, not null)
      - `created_at` (timestamptz)
    - `tat_responses`
      - `id` (uuid, primary key)
      - `stories` (jsonb, not null)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access to images
    - Add policies for authenticated insert access to responses
*/

-- Create tat_images table
CREATE TABLE IF NOT EXISTS tat_images (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create tat_responses table
CREATE TABLE IF NOT EXISTS tat_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stories JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE tat_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE tat_responses ENABLE ROW LEVEL SECURITY;

-- Policies for tat_images
CREATE POLICY "Allow public read access to images"
  ON tat_images
  FOR SELECT
  TO public
  USING (true);

-- Policies for tat_responses
CREATE POLICY "Allow anonymous submissions"
  ON tat_responses
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Insert sample TAT images
INSERT INTO tat_images (url) VALUES
  ('https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?auto=format&fit=crop&w=800'),
  ('https://images.unsplash.com/photo-1541199249251-f713e6145474?auto=format&fit=crop&w=800'),
  ('https://images.unsplash.com/photo-1517677129300-07b130802f46?auto=format&fit=crop&w=800'),
  ('https://images.unsplash.com/photo-1520013817300-1f4c1cb245ef?auto=format&fit=crop&w=800'),
  ('https://images.unsplash.com/photo-1590075865003-e48277faa558?auto=format&fit=crop&w=800'),
  ('https://images.unsplash.com/photo-1597176116047-876a32798fcc?auto=format&fit=crop&w=800'),
  ('https://images.unsplash.com/photo-1594819047096-e65bf358b318?auto=format&fit=crop&w=800'),
  ('https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&w=800'),
  ('https://images.unsplash.com/photo-1522556189639-b150ed9c4330?auto=format&fit=crop&w=800'),
  ('https://images.unsplash.com/photo-1534330207526-8e81f10ec6fc?auto=format&fit=crop&w=800');