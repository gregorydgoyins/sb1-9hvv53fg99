import React from 'react';
import { AdaptiveCreatorsPage } from '../components/AdaptiveCreatorsPage';
import { useParams } from 'react-router-dom';

export function CreatorCategoryPage() {
  const { category } = useParams<{ category: string }>();
  
  // Category-specific titles and descriptions
  const categoryData: Record<string, { title: string, description: string }> = {
    'heroes': {
      title: 'Superhero Creators',
      description: 'Comic creators specializing in superhero narratives and characters. These creators have defined the iconic heroes that shape the comic universe.'
    },
    'supervillains': {
      title: 'Supervillain Creators',
      description: 'Comic creators known for their iconic villain characters and stories. These masters of malevolence craft the antagonists that challenge our heroes.'
    },
    'sidekicks': {
      title: 'Sidekick Creators',
      description: 'Comic creators who excel at developing supporting characters. These creators bring depth to comic universes through memorable sidekicks and allies.'
    },
    'henchmen': {
      title: 'Henchmen Creators',
      description: 'Comic creators specializing in background characters and world-building. Their work adds richness and texture to comic book universes.'
    }
  };
  
  const currentCategory = category && categoryData[category] 
    ? categoryData[category] 
    : { title: 'Comic Creators', description: 'Browse all comic creators across various specialties and publishers.' };

  return (
    <AdaptiveCreatorsPage 
      category={category}
      title={currentCategory.title}
      description={currentCategory.description}
    />
  );
}

export default CreatorCategoryPage;