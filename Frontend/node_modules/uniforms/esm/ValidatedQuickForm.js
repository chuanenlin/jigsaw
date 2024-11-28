import { BaseForm } from './BaseForm';
import { Quick } from './QuickForm';
import { Validated, } from './ValidatedForm';
export const ValidatedQuickForm = Validated(Quick(BaseForm));
