import { ScanService } from '../domain/ScanService';

export class MockScanService implements ScanService {
  getVersion(): string {
    return 'Mock service';
  }

  extractText = async (): Promise<string> => {
    const mockText = `BRIEF Blank
        - Format : 1200 mots
        - Brief :
          - Format d'article comme https://www.20minutes.fr/guide-achat/4047324-20230801-meilleure-culotte-menstruelle-choisir-2023
          - Titre de l'article : Quelles sont les meilleures banques en ligne pour les indépendants en 2024 ?
          - Plan de l'article :
        - Choisir sa banque en tant qu’entrepreneur : nos conseils
        - Les meilleures banques pour créer et gérer son entreprise : inclure Blank en Position 1, choix libre pour le reste de la selec sauf Shine (pour possibilité de vendre une position par la suite)
          - Pour les infos sur Blank s'appuyer sur ce contenu :
          https://www.blank.app/blog/blank-compte-pro-des-indes. Ils souhaitent que les fonctionnalités Blank soient mises en valeur, notamment la déclaration urssaf et le module d'édition de devis et factures de Blank, qui sont de réels avantages concurrentiels.`;
    return Promise.resolve(mockText);
  };
}
